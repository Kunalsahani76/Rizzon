"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Link from 'next/link';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <Header />
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-nexa-bold mb-4 text-white">
            Unsubscribe from Newsletter
          </h1>
          <p className="text-lg text-gray-300 font-nexa-light max-w-2xl mx-auto">
            We're sorry to see you go. You can unsubscribe from our newsletter at any time.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
          {submitStatus === 'success' && (
            <div className="mb-6 p-6 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold">Successfully Unsubscribed</h3>
              </div>
              <p className="mb-4">You have been successfully unsubscribed from our newsletter.</p>
              <p className="text-sm text-green-300">
                You will no longer receive marketing emails from Rizonn. If you change your mind, you can always subscribe again on our website.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400">
              <h3 className="font-semibold mb-2">Unsubscribe Failed</h3>
              <p className="text-sm">There was an error processing your unsubscribe request. Please try again or contact us directly.</p>
            </div>
          )}

          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="text-yellow-300">
                    <h4 className="font-semibold mb-1">Before you unsubscribe</h4>
                    <p className="text-sm">
                      You'll miss out on important updates about new networking products, security patches, and industry insights that could benefit your business.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-nexa-bold py-4 rounded-full transition-all"
              >
                {isSubmitting ? 'Processing...' : 'Unsubscribe from Newsletter'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Need help or have questions about your subscription?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all text-center"
              >
                Contact Support
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/20 hover:border-white/30 transition-all text-center"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}