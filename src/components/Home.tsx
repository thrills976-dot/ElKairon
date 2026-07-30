import { Hero } from './home/Hero';
import { KeyMetrics } from './home/KeyMetrics';
import { Impact } from './home/Impact';
import { About } from './home/About';
import { Services } from './home/Services';
import { JobOpportunities } from './home/JobOpportunities';
import { WhyGermany } from './home/WhyGermany';
import { Pricing } from './home/Pricing';
import { FAQ } from './home/FAQ';
import { Testimonials } from './home/Testimonials';

export function Home({ onNavigate }: { onNavigate: (v: 'home' | 'candidate-portal' | 'employer-portal') => void }) {
  return (
    <div className="w-full">
      <Hero onNavigate={onNavigate} />
      <KeyMetrics />
      <Impact />
      <JobOpportunities />
      <About />
      <Services />
      <WhyGermany />
      <Pricing />
      <FAQ />
      <Testimonials />
    </div>
  );
}
