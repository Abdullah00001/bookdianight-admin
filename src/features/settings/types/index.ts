export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface CommissionSettings {
  clubPercentage: number;
  eventPercentage: number;
}
