export class ValidationError extends Error {}

export class ClientError extends Error {
  private _businessErrorCode: string;

  constructor(message: string, businessErrorCode: string) {
    super(message);
    this.name = 'ClientError';
    this._businessErrorCode = businessErrorCode;
  }

  get businessErrorCode(): string {
    return this._businessErrorCode;
  }
}

export class HttpError extends Error {
  private _statusCode: number;
  private _businessErrorCode: string;

  constructor(message: string, statusCode: number, businessErrorCode: string) {
    super(message);
    this.name = 'HttpError';
    this._statusCode = statusCode;
    this._businessErrorCode = businessErrorCode;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get businessErrorCode(): string {
    return this._businessErrorCode;
  }
}

export class TokenRefreshError extends ClientError {
  constructor() {
    super('再度ログインしてください', 'C01');
  }
}
