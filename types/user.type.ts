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

export type EmployeeInfo = {
  /** 社員ID */
  id: string;
  /** 入社日 */
  hireDate: number;
};

export type Tokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDate: number;
  scope: string;
};
