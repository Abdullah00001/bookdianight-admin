export interface Event {
  id: string;
  name: string;
  dateTime: string;
  table: string;
  country: string;
  price: string;
  status: 'ongoing' | 'completed' | 'canceled';
  image: string;
  about?: string;
  photos?: string[];
  location?: string;
}
