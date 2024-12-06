INSERT INTO events (
  title,
  description,
  start_date,
  end_date,
  location_name,
  location_address,
  organizer,
  tags,
  image_url,
  created_at,
  updated_at
) VALUES (
  'AWS re:Invent 2024',
  'AWS re:Invent is the largest gathering of the global cloud computing community, featuring keynotes, training and certification opportunities, technical sessions, and a huge expo showcasing new technologies and solutions.',
  '2024-12-02 00:00:00+00',
  '2024-12-06 00:00:00+00',
  'Las Vegas',
  'Las Vegas, Nevada, USA',
  'Amazon Web Services',
  ARRAY['tech', 'conference', 'ai', 'data'],
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);