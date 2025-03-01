import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
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

const addEvent = async () => {
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: 'AWS re:Invent 2024',
      description: 'AWS re:Invent is the largest gathering of the global cloud computing community, featuring keynotes, training and certification opportunities, technical sessions, and a huge expo showcasing new technologies and solutions.',
      start_date: '2024-12-02T00:00:00+00:00',
      end_date: '2024-12-06T00:00:00+00:00',
      location_name: 'Las Vegas',
      location_address: 'Las Vegas, Nevada, USA',
      organizer: 'Amazon Web Services',
      tags: ['tech', 'conference', 'ai', 'data'],
      image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      website_url: 'https://reinvent.awsevents.com/'
    })
    .select();

  if (error) {
    console.error('Error adding event:', error);
    return;
  }

  console.log('Event added successfully:', data);

  // After adding the event, let's get all event URLs
  const { data: urls, error: urlError } = await supabase
    .from('events')
    .select('title, website_url')
    .order('start_date', { ascending: true });

  if (urlError) {
    console.error('Error fetching event URLs:', urlError);
    return;
  }

  console.log('Event URLs:', urls);
};

addEvent();