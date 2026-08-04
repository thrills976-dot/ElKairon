import { Hero } from './home/Hero';
import { CredibilityStrip } from './home/CredibilityStrip';
import { TwoJourneys } from './home/TwoJourneys';
import { WhyElKairon } from './home/WhyElKairon';
import { HowItWorks } from './home/HowItWorks';
import { EmployerSection } from './home/EmployerSection';
import { JobOpportunities } from './home/JobOpportunities';
import { Testimonials } from './home/Testimonials';
import { AboutStory } from './home/AboutStory';
import { FinalCTA } from './home/FinalCTA';

export function Home({ onNavigate }: { onNavigate: (v: 'home' | 'candidate-portal' | 'employer-portal') => void }) {
  return (
    <div className="w-full">
      <Hero onNavigate={onNavigate} />
      <CredibilityStrip />
      <WhyElKairon />
      <TwoJourneys onNavigate={onNavigate} />
      <EmployerSection onNavigate={onNavigate} />
      <HowItWorks />
      <JobOpportunities />
      <Testimonials />
      <AboutStory />
      <FinalCTA onNavigate={onNavigate} />
    </div>
  );
}
