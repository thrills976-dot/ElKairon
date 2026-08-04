import { FAQ } from '../home/FAQ';
import { ContactMap } from '../home/ContactMap';
import { Testimonials } from '../home/Testimonials';
import { CandidateGuides } from '../insights/CandidateGuides';

export function InsightsPage() {
  return (
    <>
      <Testimonials />
      <FAQ />
      <CandidateGuides />
      <ContactMap />
    </>
  );
}
