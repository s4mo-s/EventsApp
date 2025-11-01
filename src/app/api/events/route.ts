import { NextRequest, NextResponse } from 'next/server';
import { fetchAllBrnoEvents } from '@/lib/facebook';
import { Event } from '@/lib/types';

function getMockEvents(): Event[] {
  const now = new Date();
  const today = new Date(now);
  today.setHours(20, 0, 0, 0);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(22, 0, 0, 0);

  // Saturday
  const saturday = new Date(now);
  const daysUntilSaturday = 6 - now.getDay();
  saturday.setDate(now.getDate() + daysUntilSaturday);
  saturday.setHours(21, 0, 0, 0);

  // Sunday
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(19, 0, 0, 0);

  // Next week
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);
  nextWeek.setHours(20, 30, 0, 0);

  // Next month
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);
  nextMonth.setDate(15);
  nextMonth.setHours(18, 0, 0, 0);

  return [
    {
      id: '1',
      name: 'Techno Night @ Club Underground',
      description: 'Join us for an epic techno night with international DJs and underground vibes.',
      start_time: today.toISOString(),
      place: {
        name: 'Club Underground',
        location: {
          city: 'Brno',
          street: 'Masarykova 18'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop'
      }
    },
    {
      id: '2',
      name: 'Jazz Evening',
      description: 'Live jazz performance with local musicians and cocktails.',
      start_time: today.toISOString(),
      place: {
        name: 'Jazz Club',
        location: {
          city: 'Brno',
          street: 'Náměstí Svobody 1'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop'
      }
    },
    {
      id: '3',
      name: 'House Party Weekend',
      description:
        'The biggest house music event this weekend. Multiple DJs, light show, and great atmosphere.',
      start_time: tomorrow.toISOString(),
      place: {
        name: 'House Club',
        location: {
          city: 'Brno',
          street: 'Kobližná 4'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop'
      }
    },
    {
      id: '4',
      name: 'Rock Night',
      description: 'Local rock bands performing live. Drinks, music, and good vibes.',
      start_time: saturday.toISOString(),
      place: {
        name: 'Rock Bar',
        location: {
          city: 'Brno',
          street: 'Šilingrovo náměstí 3'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop'
      }
    },
    {
      id: '5',
      name: 'Sunday Chillout',
      description: 'Relaxed Sunday evening with ambient music and cocktails.',
      start_time: sunday.toISOString(),
      place: {
        name: 'Chillout Lounge',
        location: {
          city: 'Brno',
          street: 'Poštovská 8'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop'
      }
    },
    {
      id: '6',
      name: 'Hip Hop Battle',
      description: 'Rap battle competition with prizes. Showcase your skills!',
      start_time: nextWeek.toISOString(),
      place: {
        name: 'Hip Hop Arena',
        location: {
          city: 'Brno',
          street: 'Václavská 12'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop'
      }
    },
    {
      id: '7',
      name: 'Electronic Music Festival',
      description: 'Full day electronic music festival featuring top DJs and producers.',
      start_time: nextMonth.toISOString(),
      place: {
        name: 'Festival Grounds',
        location: {
          city: 'Brno',
          street: 'Výstaviště 1'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop'
      }
    },
    {
      id: '8',
      name: 'Latin Night',
      description: 'Salsa, bachata, and latin rhythms all night long.',
      start_time: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      place: {
        name: 'Latin Club',
        location: {
          city: 'Brno',
          street: 'Kounicova 22'
        }
      },
      cover: {
        source: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop'
      }
    }
  ];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city') || 'brno';

  if (city !== 'brno') {
    return NextResponse.json({
      events: [],
      message: 'Currently only Brno is supported'
    });
  }

  try {
    // Try to fetch real events first
    const realEvents = await fetchAllBrnoEvents();

    // If no real events, return mock events for demo
    const events = realEvents.length > 0 ? realEvents : getMockEvents();

    return NextResponse.json({
      events,
      count: events.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
