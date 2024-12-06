import React, { useMemo } from 'react';
import { useEventStore } from '../store/eventStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek, startOfQuarter, endOfQuarter, getQuarter, addQuarters, subQuarters, addMonths, subMonths, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

type ViewMode = 'month' | 'quarter';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<ViewMode>('month');
  const { events, selectedTags, searchQuery } = useEventStore();

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTags =
        selectedTags.length === 0 ||
        event.tags.some((tag) => selectedTags.includes(tag));

      const matchesSearch = searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location_name?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      return matchesTags && matchesSearch;
    }).map(event => ({
      ...event,
      start_date: parseISO(event.start_date),
      end_date: parseISO(event.end_date)
    }));
  }, [events, selectedTags, searchQuery]);

  const getDateRange = () => {
    if (viewMode === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const calendarStart = startOfWeek(monthStart);
      const calendarEnd = endOfWeek(monthEnd);
      return { start: calendarStart, end: calendarEnd };
    } else {
      const quarterStart = startOfQuarter(currentDate);
      const quarterEnd = endOfQuarter(currentDate);
      return { start: quarterStart, end: quarterEnd };
    }
  };

  const dateRange = getDateRange();
  const days = eachDayOfInterval(dateRange);

  const navigate = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    } else {
      setCurrentDate(direction === 'prev' ? subQuarters(currentDate, 1) : addQuarters(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayEvents = (day: Date) => {
    return filteredEvents.filter(event => {
      return (
        (event.start_date <= day && event.end_date >= day) ||
        isSameDay(event.start_date, day) ||
        isSameDay(event.end_date, day)
      );
    });
  };

  const getHeaderText = () => {
    if (viewMode === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      return `Q${getQuarter(currentDate)} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        {/* Calendar Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {getHeaderText()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('prev')}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Tabs */}
              <div className="bg-slate-100 rounded-lg p-1">
                <nav className="flex space-x-1" aria-label="Calendar view">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'month'
                        ? 'bg-white text-slate-900 shadow-soft'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setViewMode('quarter')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'quarter'
                        ? 'bg-white text-slate-900 shadow-soft'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Quarterly
                  </button>
                </nav>
              </div>
              
              <button
                onClick={goToToday}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                Today
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-slate-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {days.map((day) => {
              const dayEvents = getDayEvents(day);
              const isCurrentPeriod = viewMode === 'month' 
                ? isSameMonth(day, currentDate)
                : day >= startOfQuarter(currentDate) && day <= endOfQuarter(currentDate);
              
              return (
                <div
                  key={day.toString()}
                  className={`min-h-[120px] p-2 rounded-lg border ${
                    isCurrentPeriod
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50/50 border-slate-100'
                  } ${isToday(day) ? 'ring-2 ring-brand-500 ring-offset-2' : ''}`}
                >
                  <div className="text-right mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">
                        {format(day, 'MMM')}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          isCurrentPeriod
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        } ${isToday(day) ? 'text-brand-600' : ''}`}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="px-2 py-1 text-xs rounded bg-brand-50 border border-brand-100 text-brand-700 truncate cursor-pointer hover:bg-brand-100 transition-colors"
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};