import { Event } from './types';

const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_API_VERSION = 'v18.0';

// Facebook Page IDs for clubs in Brno
// TODO: Add actual club Page IDs
const BRNO_CLUB_PAGES: string[] = [
  // Example: '1234567890'
];

export async function fetchEventsFromPage(pageId: string): Promise<Event[]> {
  if (!FACEBOOK_ACCESS_TOKEN) {
    console.error('FACEBOOK_ACCESS_TOKEN is not set');
    return [];
  }

  try {
    const url = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/${pageId}/events?fields=name,description,start_time,end_time,place,cover&access_token=${FACEBOOK_ACCESS_TOKEN}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Facebook API error for page ${pageId}:`, response.statusText);
      return [];
    }

    const data = await response.json();

    if (data.error) {
      console.error(`Facebook API error for page ${pageId}:`, data.error);
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error(`Error fetching events from page ${pageId}:`, error);
    return [];
  }
}

export async function fetchAllBrnoEvents(): Promise<Event[]> {
  if (BRNO_CLUB_PAGES.length === 0) {
    console.warn('No club pages configured for Brno');
    return [];
  }

  try {
    const allEventsPromises = BRNO_CLUB_PAGES.map((pageId) => fetchEventsFromPage(pageId));

    const eventsArrays = await Promise.all(allEventsPromises);
    const allEvents = eventsArrays.flat();

    // Filter only upcoming events and sort by date
    const now = new Date();
    const upcomingEvents = allEvents
      .filter((event) => {
        const eventDate = new Date(event.start_time);
        return eventDate > now;
      })
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    return upcomingEvents;
  } catch (error) {
    console.error('Error fetching all Brno events:', error);
    return [];
  }
}
