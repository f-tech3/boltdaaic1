import React from 'react';
import { 
  Radio, 
  Users, 
  Globe, 
  Calendar,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: 'Monthly Users',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      value: '1.2K',
      label: 'Events Listed',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      value: '85+',
      label: 'Cities',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-400/10 to-brand-600/10" />
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(241 245 249 / 0.4) 1px, transparent 0)',
               backgroundSize: '32px 32px'
             }} />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full opacity-20 blur-3xl animate-pulse-slow delay-700" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 p-3 bg-white rounded-2xl shadow-soft animate-fade-in">
              <Radio className="w-12 h-12 text-brand-500" />
            </div>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
                DaaiC
              </span>
            </h1>
            
            <p className="max-w-2xl text-xl text-slate-600 mb-12 animate-fade-in">
              Your premier destination for discovering and tracking the most influential Data Analytics and AI conferences worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in">
              {stats.map(({ icon: Icon, value, label, gradient }, index) => (
                <div key={label} 
                     className="relative group"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative bg-white rounded-2xl p-6 shadow-soft">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <Icon className="w-6 h-6 text-brand-500" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">{value}</span>
                      <span className="text-sm text-slate-600">{label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.1) 1px, transparent 0)',
                   backgroundSize: '24px 24px'
                 }} />
            
            <div className="relative px-8 py-16 sm:px-16 sm:py-24">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Join the Community?
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Stay updated with the latest conferences and connect with industry professionals.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all group">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};