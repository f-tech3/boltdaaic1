import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Notification = Database['public']['Tables']['notifications']['Row'];

interface NotificationStore {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: (userId: string) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  subscribeToNotifications: (userId: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  loading: true,
  fetchNotifications: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ notifications: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      set({ loading: false });
    }
  },
  markAsRead: async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },
  subscribeToNotifications: (userId: string) => {
    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          set((state) => ({
            notifications: [payload.new as Notification, ...state.notifications],
          }));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },
}));