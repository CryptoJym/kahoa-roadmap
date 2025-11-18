import { Suspense } from 'react';
import { PersonalizedHero } from '@/components/marketing/PersonalizedHero';
import { TrustBar } from '@/components/marketing/TrustBar';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { SolutionSection } from '@/components/marketing/SolutionSection';
import { ROICalculator } from '@/components/marketing/ROICalculator';
import { CaseStudies } from '@/components/marketing/CaseStudies';
import { CTASection } from '@/components/marketing/CTASection';
import { LinkedInOptimizer } from '@/components/analytics/LinkedInOptimizer';

export default function HomePage() {
  return (
    <>
      <LinkedInOptimizer />
      <main className="flex flex-col min-h-screen">
        <TrustBar />
        
        <Suspense fallback={<HeroSkeleton />}>
          <PersonalizedHero />
        </Suspense>
        
        <ProblemSection />
        <SolutionSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Calculate Your ROI
            </h2>
            <ROICalculator />
          </div>
        </section>
        
        <CaseStudies />
        <CTASection />
      </main>
    </>
  );
}

function HeroSkeleton() {
  return (
    <div className="h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse" />
  );
}