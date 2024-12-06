import React from 'react';
import { Scale, FileText, AlertCircle, Users, Shield, HelpCircle } from 'lucide-react';

export const Terms: React.FC = () => {
  const sections = [
    {
      icon: Scale,
      title: 'Agreement to Terms',
      content: `By accessing or using DAAIC (Data Analytics & AI Conferences), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.`
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: `The service and its original content, features, and functionality are owned by DAAIC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`
    },
    {
      icon: Users,
      title: 'User Accounts',
      content: `When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.`
    },
    {
      icon: AlertCircle,
      title: 'Acceptable Use',
      content: `You agree not to:
      • Use the service for any illegal purpose
      • Violate any laws in your jurisdiction
      • Infringe upon the rights of others
      • Submit false or misleading information
      • Interfere with or disrupt the service`
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: `DAAIC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.`
    },
    {
      icon: HelpCircle,
      title: 'Changes to Terms',
      content: `We reserve the right to modify or replace these terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.`
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
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h1>
              <p className="text-slate-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-12">
                These Terms of Service ("Terms") govern your access to and use of DAAIC's services, including our website, events information, and related features. Please read these Terms carefully before using our services.
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