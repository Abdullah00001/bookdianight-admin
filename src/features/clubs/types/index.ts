export interface Club {
  id: string;
  name: string;
  thumbnail: string | null;
  dateAndTime: string;
  table: string;
  country: string;
  price: number;
  currency: string;
  isActive: boolean;
  deactivatedAt: string | null;
  createdAt: string;
  
  description?: string;
  images?: string[];
  location?: string;
}
