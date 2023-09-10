export class ValidationError extends Error {}

export class TokenRefreshError extends Error {
  constructor() {
    super('再度ログインしてください');
    this.name = 'TokenRefreshError';
  }
}
