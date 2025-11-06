'use client';

import { useState, useEffect } from 'react';

export default function PincodeGate({ children }: { children: React.ReactNode }) {
  const [pincode, setPincode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked
    const unlocked = localStorage.getItem('siteUnlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode === '4444') {
      setIsUnlocked(true);
      localStorage.setItem('siteUnlocked', 'true');
      setError(false);
    } else {
      setError(true);
      setPincode('');
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-royal-blue flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center space-y-6">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold text-charcoal tracking-tight">
            Coming Soon
          </h1>

          <p className="font-[family-name:var(--font-body)] text-xl text-charcoal/80">
            Dr. Bee Leez Blend
          </p>

          <p className="font-[family-name:var(--font-body)] text-base text-charcoal/60">
            We're putting the finishing touches on something special.
          </p>

          <form onSubmit={handleSubmit} className="pt-6 space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter PIN to preview"
                className="w-full px-4 py-3 border-2 border-charcoal/20 rounded-md text-center text-lg font-[family-name:var(--font-body)] focus:outline-none focus:border-royal-blue transition-colors"
                maxLength={4}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 font-[family-name:var(--font-body)]">
                  Incorrect PIN. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-royal-blue text-white px-6 py-3 rounded-md text-lg font-semibold font-[family-name:var(--font-body)] hover:bg-royal-blue/90 transition-all duration-200"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
