import React from 'react';
import { Event } from '../types/event';
import { format } from 'date-fns';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  Bookmark
} from 'lucide-react';
import { useEventStore } from '../store/eventStore';
import { getCountdown } from '../utils/dateUtils';
import { getPrimaryCategoryInfo } from '../utils/categoryUtils';

interface EventCardProps {
  event: Event & { url: string };
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const toggleBookmark = useEventStore((state) => state.toggleBookmark);
  const countdown = getCountdown(event.startDate);

  const primaryCategoryInfo = getPrimaryCategoryInfo(event.tags);
  const CategoryIcon = primaryCategoryInfo.icon;

  return (
    <div className="group relative bg-slate-800/70 backdrop-blur-md rounded-xl overflow-hidden transition-all hover:shadow-lg animate-fade-in border border-slate-700/50">
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* Days Left Ribbon */}
        <div className="days-left-ribbon" style={{
          '--ribbon-color-from': countdown.status === 'past' ? '#64748b' : 
                                countdown.status === 'today' ? '#f59e0b' : 
                                countdown.urgency === 'immediate' ? '#ef4444' :
                                countdown.urgency === 'close' ? '#f59e0b' :
                                '#22c55e',
          '--ribbon-color-to': countdown.status === 'past' ? '#475569' :
                              countdown.status === 'today' ? '#d97706' :
                              countdown.urgency === 'immediate' ? '#dc2626' :
                              countdown.urgency === 'close' ? '#d97706' :
                              '#16a34a'
        } as React.CSSProperties}>
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

        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-4 right-16 z-10">
          <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${primaryCategoryInfo.gradient} text-white text-sm font-medium shadow-lg flex items-center gap-2`}>
            <CategoryIcon className="w-3 h-3" />
            {primaryCategoryInfo.label}
          </div>
        </div>

        <button
          onClick={() => toggleBookmark(event.id)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/90 backdrop-blur-sm shadow-soft hover:bg-slate-800 transition-colors z-10"
        >
          <Bookmark
            className={`w-4 h-4 ${
              event.isBookmarked ? 'fill-current text-brand-500' : 'text-slate-400'
            }`}
          />
        </button>

        {/* Tags */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent p-4">
          <div className="flex flex-wrap gap-1.5">
            {event.tags.slice(1).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/90 backdrop-blur-sm text-slate-200 flex items-center gap-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-medium text-white line-clamp-2">
            {event.title}
          </h3>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-colors group/link"
          >
            <ExternalLink className="w-5 h-5 transition-transform group-hover/link:scale-110" />
          </a>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span>{format(event.startDate, 'MMM d, yyyy')}</span>
            {event.endDate?.getTime() !== event.startDate.getTime() && (
              <>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span>{format(event.endDate, 'MMM d, yyyy')}</span>
              </>
            )}
          </div>
          
          {event.location?.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-500 mt-0.5" />
              <span className="text-slate-300">{event.location.address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};