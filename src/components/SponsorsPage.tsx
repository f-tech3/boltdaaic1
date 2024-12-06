import React, { useState } from 'react';
import { Send, Gem, CheckCircle2, Users, Calendar, Tag, Sparkles } from 'lucide-react';

export const SponsorsPage: React.FC = () => {
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

  const stats = [
    {
      icon: Users,
      value: '10K+',
      label: 'Monthly Users',
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    },
    {
      icon: Calendar,
      value: '400+',
      label: 'Events',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c'
    },
    {
      icon: Tag,
      value: '35+',
      label: 'Categories',
      gradient: 'from-amber-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Gradient Orb */}
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-2xl" />
          <div className="relative flex justify-center">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-soft">
              <Gem className="w-16 h-16 text-brand-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Become a Sponsor
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            Connect with the data analytics and AI community. Showcase your brand to thousands of professionals.
            Our sponsorship program is launching soon.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, label, gradient, image }) => (
              <div key={label} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-brand-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-soft">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={image} 
                      alt={label}
                      className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/95 dark:from-slate-800/80 dark:to-slate-800/95" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-brand-50 dark:bg-brand-500/10 rounded-xl">
                        <Icon className="w-6 h-6 text-brand-500 dark:text-brand-400" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-soft relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                 backgroundSize: '24px 24px'
               }} />

          <div className="relative">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Get Early Access
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Be the first to know when our sponsorship opportunities become available.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 p-4 rounded-xl animate-fade-in">
                <CheckCircle2 className="w-5 h-5" />
                <span>Thank you for your interest! We'll be in touch soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all dark:bg-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !consent}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    Notify Me
                  </button>
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sponsor-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-500 focus:ring-brand-500"
                  />
                  <label htmlFor="sponsor-consent" className="text-sm text-slate-600 dark:text-slate-400 text-left">
                    I consent to receiving emails about sponsorship opportunities and related updates. I understand that I can unsubscribe at any time. View our{' '}
                    <a href="/privacy" className="text-brand-500 hover:text-brand-600 underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};