import { supabase } from './supabase';

const getEventUrls = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('title, website_url')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching event URLs:', error);
    return;
  }

  console.log('Event URLs:', data);
  return data;
};

getEventUrls();