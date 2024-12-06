import { Event, EventTag } from '../types/event';

const eventImages = {
  ai: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    'https://images.unsplash.com/photo-1591453089816-0fbb971b454c',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
  ],
  conference: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b'
  ],
  data: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0'
  ],
  health: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0'
  ],
  tech: [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
  ],
  business: [
    'https://images.unsplash.com/photo-1664575602276-acd073f104c1',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf'
  ]
};

const locations = {
  'Las Vegas': 'Las Vegas, Nevada, USA',
  'London': 'London, United Kingdom',
  'Orlando': 'Orlando, Florida, USA',
  'Minneapolis': 'Minneapolis, Minnesota, USA',
  'Austin': 'Austin, Texas, USA',
  'Santa Clara': 'Santa Clara, California, USA',
  'New York': 'New York City, New York, USA'
};

const assignTags = (title: string, description: string = ''): EventTag[] => {
  const tags: EventTag[] = ['conference'];
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.match(/\b(ai|artificial intelligence|machine learning|neural|nlp|generative|llm)\b/)) {
    tags.push('ai');
  }
  if (text.match(/\b(data|analytics|snowflake|databricks|big data)\b/)) {
    tags.push('data');
  }
  if (text.match(/\b(health|medical|bio|medtech|healthcare)\b/)) {
    tags.push('health');
  }
  if (text.match(/\b(tech|developer|aws|cloud|google|microsoft|nvidia)\b/)) {
    tags.push('tech');
  }
  if (text.match(/\b(business|enterprise|salesforce|sap|oracle|gartner)\b/)) {
    tags.push('business');
  }
  
  return [...new Set(tags)];
};

const getRandomImage = (tags: EventTag[]): string => {
  const validTags = tags.filter(tag => tag in eventImages);
  if (validTags.length === 0) return eventImages.conference[0];
  const randomTag = validTags[Math.floor(Math.random() * validTags.length)];
  const images = eventImages[randomTag as keyof typeof eventImages];
  return images[Math.floor(Math.random() * images.length)];
};

const extractLocation = (title: string): { name: string; address: string } | undefined => {
  const locationMatch = Object.keys(locations).find(loc => 
    title.includes(loc) || title.includes(loc.toUpperCase())
  );
  
  if (locationMatch) {
    return {
      name: locationMatch,
      address: locations[locationMatch as keyof typeof locations]
    };
  }
  
  // Try to extract location from pipes or dashes
  const parts = title.split(/[|-]/);
  if (parts.length > 1) {
    const locationPart = parts.find(part => 
      part.trim().match(/\b([A-Z][a-z]+(\s[A-Z][a-z]+)*)\b/)
    );
    if (locationPart) {
      return {
        name: locationPart.trim(),
        address: locationPart.trim()
      };
    }
  }
  
  return undefined;
};

const generateDescription = (title: string, tags: EventTag[]): string => {
  const tagDescriptions = {
    ai: 'artificial intelligence and machine learning',
    data: 'data science and analytics',
    tech: 'technology and innovation',
    health: 'healthcare and medical technology',
    business: 'business and enterprise solutions',
    conference: 'professional conference'
  };

  const relevantTags = tags.filter(tag => tag !== 'conference');
  const tagPhrase = relevantTags
    .map(tag => tagDescriptions[tag as keyof typeof tagDescriptions])
    .join(' and ');

  return `Join industry leaders and professionals at ${title}, a premier ${tagPhrase} ${
    relevantTags.length > 0 ? 'conference' : 'event'
  }. Network with peers, learn from experts, and discover the latest innovations in ${
    tagPhrase || 'the industry'
  }.`;
};

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  
  const [month, day, year] = dateStr.split('/').map(num => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

export const parseCSVEvents = (csvData: string): Event[] => {
  const lines = csvData.trim().split('\n');
  const events: Event[] = [];
  const seen = new Set<string>();
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const [title, startDate, endDate] = lines[i].split(',').map(str => str.trim());
    
    // Skip if no title or we've seen this event before
    if (!title || seen.has(title)) continue;
    seen.add(title);
    
    try {
      const parsedStartDate = parseDate(startDate);
      const parsedEndDate = endDate ? parseDate(endDate) : new Date(parsedStartDate);
      
      if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        console.warn(`Skipping event with invalid date: ${title}`);
        continue;
      }

      const cleanTitle = title.split(/[|-]/)[0].trim();
      const tags = assignTags(title);
      const location = extractLocation(title);
      const description = generateDescription(cleanTitle, tags);
      
      events.push({
        id: `evt-${i}`,
        title: cleanTitle,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location,
        tags,
        imageUrl: getRandomImage(tags),
        isBookmarked: false
      });
    } catch (error) {
      console.warn(`Error parsing event: ${title}`, error);
    }
  }
  
  return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};