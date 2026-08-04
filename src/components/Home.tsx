import { Hero } from './home/Hero';
import { Stats } from './home/Stats';
import { GuaranteedBenefits } from './home/GuaranteedBenefits';
import { TwoJourneys } from './home/TwoJourneys';
import { WhyElKairon } from './home/WhyElKairon';
import { HowItWorks } from './home/HowItWorks';
import { EmployerSection } from './home/EmployerSection';
import { JobOpportunities } from './home/JobOpportunities';
import { Testimonials } from './home/Testimonials';
import { AboutStory } from './home/AboutStory';
import { FinalCTA } from './home/FinalCTA';
import { FAQ } from './home/FAQ';
import { NewsletterSignup } from './home/NewsletterSignup';
import { ContactMap } from './home/ContactMap';

export function Home({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  return (
    <div className="w-full">
      <div id="hero"><Hero onNavigate={onNavigate} /></div>
      <Stats />
      <div id="opportunities"><JobOpportunities /></div>
      <GuaranteedBenefits />
      <div id="about"><AboutStory /></div>
      <WhyElKairon />
      <TwoJourneys onNavigate={onNavigate} />
      <EmployerSection onNavigate={onNavigate} />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <div id="insights">
        <ContactMap />
        <NewsletterSignup />
        <FinalCTA onNavigate={onNavigate} />
      </div>
    </div>
  );
}
