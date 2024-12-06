export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          name?: string | null
          avatar_url?: string | null
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          start_date: string
          end_date: string
          location_name: string | null
          location_address: string | null
          organizer: string | null
          tags: string[]
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          start_date: string
          end_date: string
          location_name?: string | null
          location_address?: string | null
          organizer?: string | null
          tags: string[]
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          start_date?: string
          end_date?: string
          location_name?: string | null
          location_address?: string | null
          organizer?: string | null
          tags?: string[]
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          event_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          event_id: string
          type: 'reminder' | 'update'
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          type: 'reminder' | 'update'
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          type?: 'reminder' | 'update'
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}