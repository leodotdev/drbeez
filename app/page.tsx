import Hero from '@/components/sections/Hero';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Formula from '@/components/sections/Formula';
import Research from '@/components/sections/Research';
import Purchase from '@/components/sections/Purchase';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSolution />
      <Formula />
      <Research />
      <Purchase />
    </main>
  );
}
