import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';
import type { EventTag } from '../types/event';

type Event = Database['public']['Tables']['events']['Row'];
type GroupBy = 'none' | 'month' | 'quarter';

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedTags: EventTag[];
  view: 'list' | 'cards';
  timeframe: 'all' | 'upcoming' | 'past';
  searchQuery: string;
  groupBy: GroupBy;
}

interface EventActions {
  fetchEvents: () => Promise<void>;
  toggleBookmark: (eventId: string, userId: string) => Promise<void>;
  toggleTag: (tag: EventTag) => void;
  setView: (view: 'list' | 'cards') => void;
  setTimeframe: (timeframe: 'all' | 'upcoming' | 'past') => void;
  setSearchQuery: (query: string) => void;
  setGroupBy: (groupBy: GroupBy) => void;
}

export const useEventStore = create<EventState & EventActions>((set, get) => ({
  events: [],
  loading: true,
  error: null,
  selectedTags: [],
  view: 'cards',
  timeframe: 'upcoming',
  searchQuery: '',
  groupBy: 'none',

  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        console.warn('No events found in the database');
      }

      set({ 
        events: data || [], 
        loading: false,
        error: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch events';
      console.error('Error fetching events:', error);
      set({ 
        error: message, 
        loading: false,
        events: []
      });
    }
  },

  toggleBookmark: async (eventId: string, userId: string) => {
    try {
      const { data: existingBookmark } = await supabase
        .from('bookmarks')
        .select()
        .eq('event_id', eventId)
        .eq('user_id', userId)
        .single();

      if (existingBookmark) {
        await supabase
          .from('bookmarks')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', userId);
      } else {
        await supabase
          .from('bookmarks')
          .insert({ event_id: eventId, user_id: userId });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  },

  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),

  setView: (view) => set({ view }),
  setTimeframe: (timeframe) => set({ timeframe }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setGroupBy: (groupBy) => set({ groupBy }),
}));