import Hero from '@/components/sections/Hero';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Research from '@/components/sections/Research';
import Purchase from '@/components/sections/Purchase';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="border-b border-charcoal/20"></div>
      <ProblemSolution />
      <div className="border-b border-charcoal/20"></div>
      <Research />
      <div className="border-b border-charcoal/20"></div>
      <Purchase />
    </main>
  );
}
