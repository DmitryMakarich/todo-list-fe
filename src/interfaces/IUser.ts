export enum USER_ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  role: USER_ROLE;
  name: string;
  password: string;
}
