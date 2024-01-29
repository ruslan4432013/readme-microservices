export interface User {
  id?: string;
  email: string;
  fullname: string;
  avatar: string;
  createdAt: Date;
  subscribersIds: string[];
}
