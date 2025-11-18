import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // TODO: Add Supabase integration
    // TODO: Add n8n webhook trigger
    // TODO: Add email sending via Resend
    
    // For now, just log and return success
    console.log('Lead captured:', body);
    
    return NextResponse.json({
      success: true,
      message: "Thank you! Check your email for next steps.",
      data: { 
        id: `lead-${Date.now()}`,
        ...body,
        captured_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: "Failed to capture lead. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Kahoa Lead API is working",
    timestamp: new Date().toISOString(),
    endpoints: {
      capture: "POST /api/leads",
      health: "GET /api/leads"
    }
  });
}