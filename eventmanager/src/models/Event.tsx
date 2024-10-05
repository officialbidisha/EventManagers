export  interface Event {
    id: string;
    startTime: string; // Use appropriate date/time type (e.g., Date or string)
    endTime: string; // Use appropriate date/time type (e.g., Date or string)
    name: string;
    category: string;
    isDisabled?: boolean;
    isSelected?: boolean;
  }
  