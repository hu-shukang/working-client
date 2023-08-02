import { Director } from './management.type';

export type UserInfo = {
  role: Director;
  family_name: string;
  given_name: string;
  picture: string;
  exp: number;
  iat: number;
  employeeCode?: string;
};
