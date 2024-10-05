export interface Event {
    id: string;
    start_time: string; // Use appropriate date/time type (e.g., Date or string)
    end_time: string; // Use appropriate date/time type (e.g., Date or string)
    event_name: string;
    event_category: string;
    isDisabled?: boolean;
    isSelected?: boolean;
  }