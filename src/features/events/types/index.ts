export interface Event {
  id: string;
  name: string;
  description?: string;
  thumbnail: string | null;
  images?: string[];
  dateAndTime: string;
  table: string;
  country: string;
  price: number;
  currency: string;
  eventStatus: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELED";
  createdAt: string;
}
