import React from 'react';
import { Shield, Lock, Eye, UserCheck, Clock, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Data Protection',
      content: `We are committed to protecting your personal data and complying with applicable data protection laws, including the General Data Protection Regulation (GDPR). We act as the data controller for any personal information collected through our services.`
    },
    {
      icon: Eye,
      title: 'Information We Collect',
      content: `We collect and process the following information:
      • Email addresses for newsletter subscriptions and notifications
      • Usage data and analytics
      • Cookie data for essential website functionality
      • Any additional information you voluntarily provide`
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: `Your information is used for:
      • Sending conference and event updates
      • Processing sponsorship requests
      • Improving our services
      • Complying with legal obligations
      We will never sell your personal data to third parties.`
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `Under GDPR, you have the right to:
      • Access your personal data
      • Correct inaccurate data
      • Request deletion of your data
      • Withdraw consent at any time
      • Request data portability
      • Object to data processing`
    },
    {
      icon: Clock,
      title: 'Data Retention',
      content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected. You can request deletion of your data at any time.`
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: `For any privacy-related questions or to exercise your rights, please contact our Data Protection Officer at privacy@daaic.com`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-12 bg-gradient-to-br from-brand-400/10 to-brand-600/10">
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                   backgroundSize: '24px 24px'
                 }} />
            <div className="relative">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
              <p className="text-slate-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-12">
                At DAAIC (Data Analytics & AI Conferences), we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
              </p>

              <div className="space-y-12">
                {sections.map(({ icon: Icon, title, content }) => (
                  <div key={title} className="relative group">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                        <div className="relative p-3 bg-brand-50 rounded-xl">
                          <Icon className="w-6 h-6 text-brand-500" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">{title}</h2>
                        <div className="text-slate-600 space-y-4">
                          {content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};