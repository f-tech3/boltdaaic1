import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  'https://pyywkkmzdavroidwnzhf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eXdra216ZGF2cm9pZHduemhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MTc0MjcsImV4cCI6MjA0Nzk5MzQyN30.RQDJe27B6zsMbTIjPsAS5gijAv7snCAIoGSewnoeRFI',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public'
    }
  }
);