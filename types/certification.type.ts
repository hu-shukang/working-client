export type AuthResult = {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: string;
  NewDeviceMetadata: any | undefined;
};
