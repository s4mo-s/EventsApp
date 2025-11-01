'use client';

import Image from 'next/image';
import { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
  viewMode: 'list' | 'grid';
}

export default function EventCard({ event, viewMode }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col">
        {event.cover && (
          <div className="w-full h-40 relative">
            <Image
              src={event.cover.source}
              alt={event.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.name}</h3>

          <div className="text-sm text-gray-600 mb-2">
            <p className="font-medium">📅 {formatDate(event.start_time)}</p>
          </div>

          {event.place && (
            <div className="text-sm text-gray-600">
              <p className="font-medium">📍 {event.place.name}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col md:flex-row">
      {event.cover && (
        <div className="w-full md:w-64 h-40 md:h-48 relative flex-shrink-0">
          <Image
            src={event.cover.source}
            alt={event.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-4 md:p-6 flex-grow">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2">{event.name}</h3>

        <div className="text-sm text-gray-600 mb-2 md:mb-0">
          <p className="font-medium">📅 {formatDate(event.start_time)}</p>
        </div>

        {event.place && (
          <div className="text-sm text-gray-600">
            <p className="font-medium">📍 {event.place.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
