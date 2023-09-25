export type EmployeeInfo = {
  /** 社員ID */
  id: string;
  /** 入社日 */
  hireDate: string;
  /** 権限 */
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
  refreshToken: string;
};

export type TokenResponse = {
  tokens: Tokens;
  info: EmployeeInfo;
};
