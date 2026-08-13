export interface EarningTransaction {
  id: string;
  name: string;
  image: string;
  createdBy: string;
  date: string;
  time: string;
  location: string;
  price: string;
  commission: string;
  earning: string;
  status: 'Completed' | 'Canceled';
  type: 'clubs' | 'events';
}
