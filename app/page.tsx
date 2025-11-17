import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-royal-blue p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="bg-white w-full h-full overflow-auto">
        <Hero />
      </div>
    </main>
  );
}
