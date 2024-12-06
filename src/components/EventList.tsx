import React, { useEffect } from 'react';
import { useEventStore } from '../store/eventStore';
import { EventCard } from './EventCard';
import { startOfMonth, startOfQuarter, format, getQuarter } from 'date-fns';
import { Loader2, Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { getCountdown } from '../utils/dateUtils';

export const EventList: React.FC = () => {
  const { 
    events, 
    loading, 
    error,
    selectedTags, 
    timeframe, 
    searchQuery, 
    groupBy,
    view,
    fetchEvents 
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const now = new Date();
  
  const filteredEvents = events.filter((event) => {
    const matchesTags =
      selectedTags.length === 0 ||
      event.tags.some((tag) => selectedTags.includes(tag));

    const matchesSearch = searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location_name?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const startDate = new Date(event.start_date);
    const isUpcoming = startDate >= now;
    const isPast = startDate < now;

    return (
      matchesTags &&
      matchesSearch &&
      (timeframe === 'all' ||
        (timeframe === 'upcoming' && isUpcoming) ||
        (timeframe === 'past' && isPast))
    );
  });

  const groupedEvents = React.useMemo(() => {
    if (groupBy === 'none') return { '': filteredEvents };

    return filteredEvents.reduce((acc, event) => {
      const date = new Date(event.start_date);
      let groupKey;

      if (groupBy === 'month') {
        groupKey = format(startOfMonth(date), 'MMMM yyyy');
      } else {
        groupKey = `Q${getQuarter(date)} ${date.getFullYear()}`;
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(event);
      return acc;
    }, {} as Record<string, typeof events>);
  }, [filteredEvents, groupBy]);

  const getEventUrl = (title: string) => {
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `https://conference.${slug}.com`;
  };

  const getCountdownDisplay = (startDate: Date) => {
    const countdown = getCountdown(startDate);
    switch (countdown.status) {
      case 'past':
        return (
          <span className="text-slate-400 dark:text-slate-500">
            Event ended
          </span>
        );
      case 'today':
        return (
          <span className="text-brand-500 dark:text-brand-400 font-medium animate-pulse">
            Happening today!
          </span>
        );
      case 'upcoming':
        return (
          <span className="text-brand-600 dark:text-brand-400">
            {countdown.days} {countdown.days === 1 ? 'day' : 'days'} left
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading events</p>
          <button 
            onClick={() => fetchEvents()}
            className="text-brand-500 hover:text-brand-600 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {Object.entries(groupedEvents).map(([group, groupEvents]) => (
        <div key={group} className="mb-8">
          {group && (
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              {group}
            </h2>
          )}
          <div className={view === 'cards' ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
            "space-y-4"
          }>
            {groupEvents.map((event) => (
              view === 'cards' ? (
                <EventCard 
                  key={event.id} 
                  event={{
                    ...event,
                    startDate: new Date(event.start_date),
                    endDate: new Date(event.end_date),
                    location: event.location_name ? {
                      name: event.location_name,
                      address: event.location_address || event.location_name
                    } : undefined,
                    isBookmarked: false,
                    url: getEventUrl(event.title)
                  }} 
                />
              ) : (
                <div 
                  key={event.id}
                  className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 shadow-soft hover:shadow-lg transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-500" />
                        <span>{format(new Date(event.start_date), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-500" />
                        {getCountdownDisplay(new Date(event.start_date))}
                      </div>
                      {event.location_name && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand-500" />
                          <span>{event.location_name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium rounded-md bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={getEventUrl(event.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors group"
                    >
                      <ExternalLink className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      ))}
      {filteredEvents.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-slate-400 dark:text-slate-500">No events found matching your criteria</p>
        </div>
      )}
    </main>
  );
};