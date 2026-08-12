// Dashboard Types

export type TUserManagementData = {
  name: string;
  users: number;
};

export type TRecentUser = {
  id: number;
  name: string;
  phone: string;
  email: string;
  type: string;
  country: string;
  joinDate: string;
};
