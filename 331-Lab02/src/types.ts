export interface Organizer {
  id: number;
  organizationName: string;
  address: string;
  images: string[];
}
export interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petAllowed: boolean;
  organizer: string;
  images: string[];
}

export interface MessageState {
  messages: string
} 

export interface EventState {
  event: Event | null;
}