-- Add website_url column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Create index for faster URL lookups
CREATE INDEX IF NOT EXISTS idx_events_website_url ON events(website_url);