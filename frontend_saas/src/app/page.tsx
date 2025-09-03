import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Plans from '../components/plans';
import { ProblemSection } from '@/components/ProblemSolution'
import { SolutionSection } from '@/components/ProblemSolution'
import GetReady from '@/components/GetReady'

export default function Home() {
  return (
     <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
       <Features />
      <Plans />
      <GetReady />
     </>
  );
}
