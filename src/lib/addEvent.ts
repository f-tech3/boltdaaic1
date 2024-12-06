import { supabase } from './supabase';

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
      image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'
    })
    .select();

  if (error) {
    console.error('Error adding event:', error);
    return;
  }

  console.log('Event added successfully:', data);
};

addEvent();