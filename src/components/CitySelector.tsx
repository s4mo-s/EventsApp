'use client';

import React from 'react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const cities = [{ value: 'brno', label: 'Brno' }];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCityChange(e.target.value);
  };

  return (
    <div>
      <select
        value={selectedCity}
        onChange={handleChange}
        className="px-6 py-2.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white min-w-[150px]"
      >
        {cities.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
    </div>
  );
}
