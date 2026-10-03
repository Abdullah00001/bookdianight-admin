export interface EarningTransaction {
  id: string;
  name: string;
  image?: string;
  createdBy: string;
  dateAndTime: string;
  location: string;
  price: number;
  commission: number;
  earning: number;
  status: 'Completed' | 'Canceled' | 'Pending';
  serviceType: 'CLUB' | 'EVENT';
  currency: string;
}
