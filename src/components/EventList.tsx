'use client';

import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Event, CategorizedEvents } from '@/lib/types';

interface EventListProps {
  city: string;
  viewMode: 'list' | 'grid';
}

export default function EventList({ city, viewMode }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/events?city=${city}`);
        const data = await response.json();

        if (response.ok) {
          setEvents(data.events || []);
        } else {
          setError(data.error || 'Failed to fetch events');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [city]);

  function categorizeEvents(events: Event[]): CategorizedEvents {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const today = new Date(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Weekend start (Saturday)
    const thisWeekendStart = new Date(now);
    const dayOfWeek = now.getDay();
    const daysUntilSaturday = 6 - dayOfWeek;
    thisWeekendStart.setDate(now.getDate() + daysUntilSaturday);
    thisWeekendStart.setHours(0, 0, 0, 0);

    // Weekend end (Sunday)
    const thisWeekendEnd = new Date(thisWeekendStart);
    thisWeekendEnd.setDate(thisWeekendStart.getDate() + 1);
    thisWeekendEnd.setHours(23, 59, 59, 999);

    // End of month
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    thisMonthEnd.setHours(23, 59, 59, 999);

    const categorized: CategorizedEvents = {
      today: [],
      tomorrow: [],
      thisWeekend: [],
      thisMonth: []
    };

    events.forEach((event) => {
      const eventDate = new Date(event.start_time);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        categorized.today.push(event);
      } else if (eventDate.getTime() === tomorrow.getTime()) {
        categorized.tomorrow.push(event);
      } else if (eventDate >= thisWeekendStart && eventDate <= thisWeekendEnd) {
        categorized.thisWeekend.push(event);
      } else if (eventDate > thisWeekendEnd && eventDate <= thisMonthEnd) {
        categorized.thisMonth.push(event);
      }
    });

    return categorized;
  }

  if (loading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  const categorized = categorizeEvents(events);
  const hasAnyEvents = Object.values(categorized).some((arr) => arr.length > 0);

  if (!hasAnyEvents) {
    return <div className="text-center py-12 text-gray-500">No events found</div>;
  }

  return (
    <div className="space-y-8">
      {categorized.today.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Today</h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {categorized.today.length}
            </span>
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }
          >
            {categorized.today.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))}
          </div>
        </div>
      )}

      {categorized.tomorrow.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Tomorrow</h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {categorized.tomorrow.length}
            </span>
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }
          >
            {categorized.tomorrow.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))}
          </div>
        </div>
      )}

      {categorized.thisWeekend.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">This Weekend</h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {categorized.thisWeekend.length}
            </span>
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }
          >
            {categorized.thisWeekend.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))}
          </div>
        </div>
      )}

      {categorized.thisMonth.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">This Month</h2>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {categorized.thisMonth.length}
            </span>
          </div>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }
          >
            {categorized.thisMonth.map((event) => (
              <EventCard key={event.id} event={event} viewMode={viewMode} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
