import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  LogIn,
  Calendar,
  Compass,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Mail,
  Gem
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  onPageChange: (page: 'events' | 'sponsors') => void;
  currentPage: 'events' | 'sponsors';
}

export const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const navigate = useNavigate();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const { user, signIn, signOut, loading } = useAuthStore();

  const navigation = [
    { name: 'Home', icon: Compass, page: 'events' as const, path: '/' },
    { name: 'My Events', icon: Calendar, requiresAuth: true, page: 'events' as const, path: '/' },
    { name: 'Sponsors', icon: Gem, page: 'sponsors' as const, path: '/sponsors' }
  ];

  const bottomNav = [
    { name: 'Help', icon: HelpCircle, page: 'events' as const }
  ];

  const handleNavigation = (item: typeof navigation[0]) => {
    onPageChange(item.page);
    navigate(item.path);
  };

  const handleLogoClick = () => {
    navigate('/');
    onPageChange('events');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSigningIn(true);
      await signIn(email);
      setEmail('');
      setIsProfileExpanded(false);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6">
        <button 
          onClick={handleLogoClick}
          className="flex items-start gap-3 hover:opacity-80 transition-opacity group"
        >
          <img 
            src="data:image/svg+xml,%3Csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='256' cy='256' r='240' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.2'/%3E%3Ccircle cx='256' cy='256' r='180' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.4'/%3E%3Ccircle cx='256' cy='256' r='120' stroke='%2316A34A' stroke-width='32' fill='none' opacity='0.6'/%3E%3Ccircle cx='256' cy='256' r='60' fill='%2316A34A'/%3E%3C/svg%3E"
            alt="DaaiC Logo"
            className="w-12 h-12 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col -mt-1">
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
                DaaiC
              </span>
            </h1>
            <p className="text-[0.65rem] leading-none text-slate-500 dark:text-slate-400 tracking-tight">
              Data Analytics & AI Conferences
            </p>
          </div>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group ${
                item.requiresAuth && !user
                  ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : currentPage === item.page
                  ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-500 dark:hover:text-brand-400'
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                item.requiresAuth && !user
                  ? 'text-slate-400 dark:text-slate-600'
                  : currentPage === item.page
                  ? 'text-brand-500 dark:text-brand-400'
                  : 'group-hover:text-brand-500 dark:group-hover:text-brand-400'
              }`} />
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Help Link */}
        {bottomNav.map((item) => (
          <button
            key={item.name}
            onClick={() => onPageChange(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group ${
              currentPage === item.page
                ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-500 dark:hover:text-brand-400'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              currentPage === item.page
                ? 'text-brand-500 dark:text-brand-400'
                : 'group-hover:text-brand-500 dark:group-hover:text-brand-400'
            }`} />
            {item.name}
          </button>
        ))}

        {/* Profile Section */}
        <div className="relative">
          {user ? (
            // Logged in user profile
            <button
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.email || ''}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                )}
              </div>
              <span className="flex-1 text-left truncate">{user.email}</span>
              {isProfileExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>
          ) : (
            // Sign in button
            <button
              onClick={() => setIsProfileExpanded(true)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Expanded Menu */}
          {isProfileExpanded && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 animate-fade-in">
              {user ? (
                // User profile menu
                <>
                  <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsProfileExpanded(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                // Sign in form
                <form onSubmit={handleSignIn} className="p-2">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSigningIn || loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4" />
                      {isSigningIn ? 'Sending link...' : 'Sign in with Email'}
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      We'll send you a magic link to sign in
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};