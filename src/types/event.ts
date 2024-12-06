export type EventTag = 'ai' | 'genai' | 'tech' | 'industry' | 'conference' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: {
    name: string;
    address: string;
  };
  organizer?: string;
  tags: EventTag[];
  imageUrl?: string;
  isBookmarked: boolean;
  url?: string;
}