import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Send, Bell, CheckCircle2, Sparkles, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.getwaitlist.com/api/v1/waiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          waitlist_id: '22521',
          consent: true,
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        setConsent(false);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subscribe Section */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                 backgroundSize: '24px 24px'
               }} />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-3xl animate-pulse delay-700" />

          <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-soft overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl blur-lg opacity-50 animate-pulse" />
                  <div className="relative p-3 bg-white dark:bg-slate-900 rounded-xl shadow-soft">
                    <Bell className="w-6 h-6 text-brand-500" />
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                <Zap className="w-5 h-5 text-brand-500 animate-pulse delay-150" />
              </div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600 mb-3">
                Stay in the Loop
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                Get notified about upcoming data analytics and AI conferences, exclusive events, and early-bird tickets
              </p>

              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-6 py-4 rounded-2xl animate-scale">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">You're all set! Watch your inbox for updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute -inset-px bg-gradient-to-r from-brand-400 to-brand-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting || !consent}
                          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/btn hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]"
                        >
                          <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          Subscribe
                        </button>
                      </div>
                    </div>

                    {/* GDPR Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-500 focus:ring-brand-500"
                      />
                      <label htmlFor="consent" className="text-sm text-slate-600 dark:text-slate-400 text-left">
                        I consent to receiving emails about upcoming conferences and events. I understand that I can unsubscribe at any time. View our{' '}
                        <Link to="/privacy" className="text-brand-500 hover:text-brand-600 underline">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="data:image/svg+xml,%3Csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='256' cy='256' r='240' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.2'/%3E%3Ccircle cx='256' cy='256' r='180' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.4'/%3E%3Ccircle cx='256' cy='256' r='120' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.6'/%3E%3Ccircle cx='256' cy='256' r='60' fill='%2316A34A'/%3E%3C/svg%3E"
              alt="DaaiC Logo"
              className="w-8 h-8"
            />
            <div>
              <h2 className="text-lg font-medium tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
                  DaaiC
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Data Analytics & AI Conferences</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              Terms
            </Link>
            <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              About
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} DaaiC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};