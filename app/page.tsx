import Hero from '@/components/sections/Hero';
import PincodeGate from '@/components/PincodeGate';

export default function Home() {
  return (
    <PincodeGate>
      <main className="min-h-screen bg-royal-blue p-4 md:p-6 lg:p-8">
        <div className="bg-white min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)]">
          <Hero />
        </div>
      </main>
    </PincodeGate>
  );
}
