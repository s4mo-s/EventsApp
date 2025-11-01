export interface Event {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  place?: {
    name: string;
    location?: {
      city?: string;
      street?: string;
    };
  };
  cover?: {
    source: string;
  };
}

export interface CategorizedEvents {
  today: Event[];
  tomorrow: Event[];
  thisWeekend: Event[];
  thisMonth: Event[];
}
