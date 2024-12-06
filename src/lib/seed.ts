import { supabase } from './supabase';
import { eventsData } from '../data/events';
import { parseCSVEvents } from '../utils/eventData';

export async function seedDatabase() {
  try {
    // Check if we already have events
    const { data: existingEvents, error: checkError } = await supabase
      .from('events')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking events:', checkError);
      return;
    }

    // If we already have events, don't seed
    if (existingEvents && existingEvents.length > 0) {
      console.log('Database already seeded');
      return;
    }

    const events = parseCSVEvents(eventsData);
    
    // Insert events in smaller batches
    const BATCH_SIZE = 5;
    for (let i = 0; i < events.length; i += BATCH_SIZE) {
      const batch = events.slice(i, i + BATCH_SIZE).map(event => ({
        title: event.title,
        description: event.description,
        start_date: event.startDate.toISOString(),
        end_date: event.endDate.toISOString(),
        location_name: event.location?.name || null,
        location_address: event.location?.address || null,
        tags: event.tags,
        image_url: event.imageUrl,
      }));

      const { error: insertError } = await supabase
        .from('events')
        .insert(batch);

      if (insertError) {
        console.error(`Error seeding batch ${i / BATCH_SIZE + 1}:`, insertError);
        continue;
      }

      // Add a small delay between batches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}