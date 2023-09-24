export type EmployeeSignupForm = {
  id: string;
  hireDate: Date;
  familyName: string;
  givenName: string;
};

export type EmployeeInfo = {
  /** 社員ID */
  id: string;
  /** 入社日 */
  hireDate: number;
  /** ロール */
  role: string;
  /** 苗字 */
  familyName: string;
  /** 名前 */
  givenName: string;
  /** アバター */
  picture: string;
  /** 部門ID */
  department: string;
  /** 部門名 */
  departmentName: string;
  /** 登録ステータス */
  signupStatus: string;
};

export type Tokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDate: number;
  scope: string;
};

export type TokenResponse = {
  info: EmployeeInfo;
  tokens: Tokens;
};
