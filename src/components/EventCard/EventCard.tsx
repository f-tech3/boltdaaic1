import React from 'react';
import { Event } from '../../types/event';
import { format } from 'date-fns';
import { 
  Bookmark, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Building2, 
  ExternalLink
} from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { CountdownBadge } from './CountdownBadge';
import { CategoryBadge } from './CategoryBadge';
import { TagList } from './TagList';

interface EventCardProps {
  event: Event & { url: string };
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const toggleBookmark = useEventStore((state) => state.toggleBookmark);

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-soft overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <div className="relative aspect-[16/9] overflow-hidden">
        <CountdownBadge startDate={event.startDate} />
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={() => toggleBookmark(event.id)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-soft hover:bg-white dark:hover:bg-slate-700 transition-colors z-10"
        >
          <Bookmark
            className={`w-4 h-4 ${
              event.isBookmarked ? 'fill-current text-brand-500' : 'text-slate-400'
            }`}
          />
        </button>

        <CategoryBadge tags={event.tags} />
        <TagList tags={event.tags} />
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white line-clamp-2">
            {event.title}
          </h3>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors group/link"
          >
            <ExternalLink className="w-5 h-5 transition-transform group-hover/link:scale-110" />
          </a>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span>{format(event.startDate, 'MMM d, yyyy')}</span>
            {event.endDate?.getTime() !== event.startDate.getTime() && (
              <>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span>{format(event.endDate, 'MMM d, yyyy')}</span>
              </>
            )}
          </div>
          
          {event.location?.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-500 mt-0.5" />
              <span className="text-slate-600 dark:text-slate-400">{event.location.address}</span>
            </div>
          )}
          
          {event.organizer && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Building2 className="w-4 h-4 text-brand-500" />
              <span>{event.organizer}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};