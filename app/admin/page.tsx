'use client';

import { useState, useEffect } from 'react';
import { defaultContent, type SiteContent } from '@/lib/default-content';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const updateHero = (field: keyof SiteContent['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateProblemSolution = (field: keyof SiteContent['problemSolution'], value: string) => {
    setContent(prev => ({
      ...prev,
      problemSolution: { ...prev.problemSolution, [field]: value }
    }));
  };

  const updateResearch = (field: keyof SiteContent['research'], value: string | string[]) => {
    setContent(prev => ({
      ...prev,
      research: { ...prev.research, [field]: value }
    }));
  };

  const updatePurchase = (field: keyof SiteContent['purchase'], value: string) => {
    setContent(prev => ({
      ...prev,
      purchase: { ...prev.purchase, [field]: value }
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '5555') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      loadContent();
    } else {
      alert('Invalid PIN');
      setPin('');
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setMessage('Content published successfully! Changes are now live.');
      } else {
        setMessage('Failed to publish content. Please try again.');
      }
    } catch (error) {
      setMessage('Error publishing content. Please try again.');
      console.error('Publish error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPin('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                Enter PIN
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Content Management</h1>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}

          <div className="space-y-8">
            {/* Hero Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => updateHero('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={content.hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={content.hero.description}
                    onChange={(e) => updateHero('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patent Info</label>
                  <input
                    type="text"
                    value={content.hero.patent}
                    onChange={(e) => updateHero('patent', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Developer</label>
                  <input
                    type="text"
                    value={content.hero.developer}
                    onChange={(e) => updateHero('developer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Problem/Solution Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Problem Title</label>
                  <input
                    type="text"
                    value={content.problemSolution.problemTitle}
                    onChange={(e) => updateProblemSolution('problemTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Solution Title</label>
                  <input
                    type="text"
                    value={content.problemSolution.solutionTitle}
                    onChange={(e) => updateProblemSolution('solutionTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Solution Closing Statement</label>
                  <textarea
                    value={content.problemSolution.solutionClosing}
                    onChange={(e) => updateProblemSolution('solutionClosing', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            {/* Research Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Research Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={content.research.title}
                    onChange={(e) => updateResearch('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={content.research.subtitle}
                    onChange={(e) => updateResearch('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Purchase Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4">Purchase Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={content.purchase.buttonText}
                    onChange={(e) => updatePurchase('buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={content.purchase.companyName}
                    onChange={(e) => updatePurchase('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={content.purchase.phone}
                    onChange={(e) => updatePurchase('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={content.purchase.email}
                    onChange={(e) => updatePurchase('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
                  <input
                    type="text"
                    value={content.purchase.copyright}
                    onChange={(e) => updatePurchase('copyright', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
            >
              {loading ? 'Publishing...' : 'Publish Changes'}
            </button>
            <button
              onClick={loadContent}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
