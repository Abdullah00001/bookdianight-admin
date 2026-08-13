import type { UserProfile, CommissionSettings } from "../types";

export const mockProfile: UserProfile = {
  id: "user-1",
  name: "Mohammad Amin",
  email: "mohammadamin@gmail.com",
  role: "Admin",
  avatar: "https://github.com/shadcn.png"
};

export const mockCommission: CommissionSettings = {
  clubPercentage: 20,
  eventPercentage: 20,
};
