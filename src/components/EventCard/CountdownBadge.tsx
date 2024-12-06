import React from 'react';
import { getCountdown } from '../../utils/dateUtils';

interface CountdownBadgeProps {
  startDate: Date;
}

export const CountdownBadge: React.FC<CountdownBadgeProps> = ({ startDate }) => {
  const countdown = getCountdown(startDate);

  const gradients = {
    past: 'from-slate-400 to-slate-500',
    today: 'from-amber-400 to-orange-500',
    upcoming: {
      far: 'from-emerald-400 to-green-500',
      near: 'from-emerald-400 to-green-500',
      close: 'from-amber-400 to-orange-500',
      immediate: 'from-rose-400 to-red-500'
    }
  };

  const getGradient = () => {
    if (countdown.status === 'past') return gradients.past;
    if (countdown.status === 'today') return gradients.today;
    return gradients.upcoming[countdown.urgency];
  };

  return (
    <div className="absolute -top-1 left-6 z-20">
      <div className={`relative px-3 py-1.5 bg-gradient-to-r ${getGradient()} text-white shadow-lg rounded-b-lg`}>
        {/* Left fold */}
        <div className="absolute -left-6 top-0 w-6 h-full bg-gradient-to-r from-black/20 to-transparent skew-x-[45deg] origin-top-right rounded-bl-lg" />
        
        {/* Content */}
        <div className="relative">
          {countdown.status === 'past' && (
            <p className="text-xs font-medium">Event ended</p>
          )}
          {countdown.status === 'today' && (
            <p className="text-xs font-medium animate-pulse">Today!</p>
          )}
          {countdown.status === 'upcoming' && (
            <>
              <p className="text-[0.65rem] uppercase tracking-wider opacity-90">Days left</p>
              <p className="text-xl font-bold leading-none">{countdown.days}</p>
            </>
          )}
        </div>
        
        {/* Bottom triangles for ribbon effect with rounded corners */}
        <div className="absolute -bottom-2 left-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-black/20 border-r-transparent rounded-bl" />
        <div className="absolute -bottom-2 right-0 w-0 h-0 border-t-[8px] border-l-[8px] border-t-black/20 border-l-transparent rounded-br" />
      </div>
    </div>
  );
};