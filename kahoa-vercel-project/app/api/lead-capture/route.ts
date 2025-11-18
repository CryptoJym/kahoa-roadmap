import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { Resend } from 'resend';
import { triggerN8NWorkflow } from '@/lib/n8n';
import { enrichLead } from '@/lib/enrichment';
import { scoreLead } from '@/lib/ai/lead-scorer';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

const leadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  linkedInUrl: z.string().url().optional(),
  source: z.string().default('website'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validatedData = leadSchema.parse(body);
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
    
    // Check for existing lead
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', validatedData.email)
      .single();
    
    if (existingLead) {
      // Update existing lead activity
      await supabase.from('lead_activities').insert({
        lead_id: existingLead.id,
        action: 'form_resubmission',
        metadata: validatedData
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Welcome back! We\'ll be in touch soon.' 
      });
    }
    
    // Enrich lead data in parallel
    const [enrichmentData, leadScore] = await Promise.all([
      enrichLead(validatedData),
      scoreLead(validatedData)
    ]);
    
    // Create lead record
    const { data: newLead, error } = await supabase
      .from('leads')
      .insert({
        ...validatedData,
        enrichment_data: enrichmentData,
        score: leadScore.score,
        score_breakdown: leadScore.breakdown,
        status: leadScore.score >= 70 ? 'qualified' : 'nurturing'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Trigger n8n workflow asynchronously
    triggerN8NWorkflow('new-lead-captured', {
      lead: newLead,
      enrichment: enrichmentData,
      score: leadScore
    }).catch(console.error);
    
    // Send immediate confirmation email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: validatedData.email,
      subject: 'Transform Your Developers into AI Powerhouses',
      react: WelcomeEmail({ 
        firstName: validatedData.firstName,
        isHighValue: leadScore.score >= 70
      }),
    });
    
    // Track conversion event
    await trackEvent({
      event: 'lead_captured',
      properties: {
        lead_id: newLead.id,
        score: leadScore.score,
        source: validatedData.source,
        utm_source: validatedData.utmSource,
        is_qualified: leadScore.score >= 70
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Thanks for your interest! Check your email for next steps.',
      nextAction: leadScore.score >= 70 ? 'schedule_call' : 'download_guide'
    });
    
  } catch (error) {
    console.error('Lead capture error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Email template component
function WelcomeEmail({ firstName, isHighValue }: { firstName: string; isHighValue: boolean }) {
  return (
    <div>
      <h1>Welcome to the AI Revolution, {firstName}!</h1>
      {isHighValue ? (
        <>
          <p>Based on your profile, you're a perfect fit for our Intelligent Engineer program.</p>
          <p>I'd love to show you how we've helped 50+ engineering teams achieve 73% productivity gains.</p>
          <a href="https://calendly.com/conor-kahoa/discovery">Schedule a 30-minute discovery call →</a>
        </>
      ) : (
        <>
          <p>You're on your way to transforming your development team with AI.</p>
          <p>Start with our free guide: "The CTO's Roadmap to AI Transformation"</p>
          <a href="https://kahoa.ai/cto-guide">Download the guide →</a>
        </>
      )}
    </div>
  );
}

async function trackEvent(event: any) {
  // Implementation for PostHog or other analytics
  // This is a placeholder
  console.log('Tracking event:', event);
}