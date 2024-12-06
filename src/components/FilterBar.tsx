import React from 'react';
import { Brain, Sparkles, Cpu, Factory, Users, Hash, X } from 'lucide-react';
import { useEventStore } from '../store/eventStore';
import type { EventTag } from '../types/event';

export const FilterBar: React.FC = () => {
  const { selectedTags, toggleTag } = useEventStore();
  
  const tags: Array<{ id: EventTag; icon: React.ReactNode; label: string; gradient: string }> = [
    { 
      id: 'ai', 
      icon: <Brain className="w-5 h-5" />, 
      label: 'AI & ML', 
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'genai', 
      icon: <Sparkles className="w-5 h-5" />, 
      label: 'Gen AI & LLMs', 
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'tech', 
      icon: <Cpu className="w-5 h-5" />, 
      label: 'Technology', 
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'industry', 
      icon: <Factory className="w-5 h-5" />, 
      label: 'Industry', 
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      id: 'conference', 
      icon: <Users className="w-5 h-5" />, 
      label: 'Conferences', 
      gradient: 'from-rose-500 to-red-500'
    },
    { 
      id: 'other', 
      icon: <Hash className="w-5 h-5" />, 
      label: 'Others', 
      gradient: 'from-slate-500 to-slate-600'
    }
  ];

  const clearAllTags = () => {
    selectedTags.forEach(tag => toggleTag(tag));
  };

  return (
    <div className="px-8 py-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">Discover Events</h2>
          </div>
          
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {tags.map(({ id, icon, label, gradient }) => {
            const isSelected = selectedTags.includes(id);
            
            return (
              <button
                key={id}
                onClick={() => toggleTag(id)}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-brand-500/20 dark:ring-brand-400/20 ring-offset-2 dark:ring-offset-slate-900 shadow-lg scale-[1.02]' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Background with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-${isSelected ? '100' : '75'} transition-opacity duration-300 group-hover:opacity-100`} />
                
                {/* Glass overlay */}
                <div className={`absolute inset-0 ${isSelected ? 'bg-white/10 dark:bg-black/10' : 'bg-white/20 dark:bg-black/20'} backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-white/10 dark:group-hover:bg-black/10`} />
                
                {/* Content */}
                <div className="relative p-4 h-full flex flex-col items-center justify-center text-center gap-2">
                  <div className={`p-3 rounded-xl ${isSelected ? 'bg-white/20 dark:bg-black/20' : 'bg-white/30 dark:bg-black/30'} shadow-sm transition-colors duration-300 group-hover:bg-white/20 dark:group-hover:bg-black/20`}>
                    {React.cloneElement(icon as React.ReactElement, {
                      className: `w-5 h-5 transition-colors duration-300 text-white`
                    })}
                  </div>
                  
                  <span className="text-sm font-medium text-white">
                    {label}
                  </span>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-lg animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};