import React, { useState, useEffect } from 'react';
import { 
  List,
  LayoutGrid,
  ListFilter,
  Search, 
  Clock, 
  X, 
  CalendarDays, 
  CalendarRange, 
  Loader2,
  Grid2X2,
  CalendarCheck,
  CalendarClock,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useEventStore } from '../store/eventStore';
import { useThemeStore } from '../store/themeStore';
import type { GroupBy } from '../store/eventStore';
import { useDebounce } from '../hooks/useDebounce';

export const Header: React.FC = () => {
  const { 
    view, 
    setView, 
    timeframe, 
    setTimeframe,
    setSearchQuery,
    groupBy,
    setGroupBy 
  } = useEventStore();

  const { theme, toggleTheme } = useThemeStore();
  
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setSearchQuery(debouncedSearchTerm);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, setSearchQuery]);

  const timeframes = [
    { id: 'upcoming', icon: Clock, label: 'Upcoming' },
    { id: 'all', icon: CalendarRange, label: 'All Events' },
    { id: 'past', icon: CalendarDays, label: 'Past' }
  ];

  const views = [
    { id: 'list', icon: List, label: 'List' },
    { id: 'cards', icon: LayoutGrid, label: 'Cards' }
  ];

  const groupings = [
    { id: 'none', icon: Grid2X2, label: 'No Groups' },
    { id: 'month', icon: CalendarCheck, label: 'Monthly' },
    { id: 'quarter', icon: CalendarClock, label: 'Quarterly' }
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Enhanced Search Bar */}
            <div className="relative flex-1">
              {/* Animated Background Gradient */}
              <div 
                className={`absolute -inset-0.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x ${
                  isSearchFocused ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Animated Sparkles */}
              <div className="absolute -inset-4 flex items-center justify-between pointer-events-none">
                <Sparkles 
                  className={`w-5 h-5 text-brand-400 transition-all duration-300 ${
                    isSearchFocused ? 'opacity-100 animate-pulse' : 'opacity-0'
                  }`}
                />
                <Sparkles 
                  className={`w-5 h-5 text-brand-500 transition-all duration-300 delay-100 ${
                    isSearchFocused ? 'opacity-100 animate-pulse' : 'opacity-0'
                  }`}
                />
                <Sparkles 
                  className={`w-5 h-5 text-brand-600 transition-all duration-300 delay-200 ${
                    isSearchFocused ? 'opacity-100 animate-pulse' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Search Input Container */}
              <div className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-lg transition-all duration-300 ${
                isSearchFocused ? 'transform scale-[1.02]' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-50 dark:from-brand-500/5 to-white dark:to-slate-800 opacity-50 rounded-xl" />
                
                <div className="relative flex items-center">
                  {/* Search Icon/Loader */}
                  <div className={`absolute left-4 transition-all duration-300 ${
                    isSearchFocused ? 'scale-110' : ''
                  }`}>
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 text-brand-500 animate-spin" />
                    ) : (
                      <Search className={`h-5 w-5 transition-colors duration-300 ${
                        isSearchFocused ? 'text-brand-500' : 'text-slate-400'
                      }`} />
                    )}
                  </div>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search events, locations, or keywords..."
                    value={searchInput}
                    onChange={handleSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`block w-full pl-12 pr-12 py-4 bg-transparent border-2 rounded-xl transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white ${
                      isSearchFocused
                        ? 'border-transparent ring-4 ring-brand-500/10'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />

                  {/* Clear Button */}
                  {searchInput && (
                    <button
                      onClick={clearSearch}
                      className={`absolute right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 group/clear ${
                        isSearchFocused ? 'text-brand-500' : 'text-slate-400'
                      }`}
                    >
                      <X className="w-4 h-4 transition-transform duration-200 group-hover/clear:rotate-90" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              {/* Time Filter Pills */}
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 gap-1">
                {timeframes.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setTimeframe(id as 'upcoming' | 'all' | 'past')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      timeframe === id
                        ? 'bg-white dark:bg-slate-900 text-brand-500 dark:text-brand-400 shadow-sm translate-y-[-1px]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggles */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5">
                <div className="flex gap-1">
                  {views.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setView(id as 'list' | 'cards')}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                        view === id
                          ? 'bg-white dark:bg-slate-900 text-brand-500 dark:text-brand-400 shadow-sm translate-y-[-1px]'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group By Pills */}
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 gap-1">
                {groupings.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setGroupBy(id as GroupBy)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      groupBy === id
                        ? 'bg-white dark:bg-slate-900 text-brand-500 dark:text-brand-400 shadow-sm translate-y-[-1px]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};