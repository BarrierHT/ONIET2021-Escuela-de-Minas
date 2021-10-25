export interface Country {
  countryCode: string;
  countryName: string;
}

export interface UserPayload {
  email: string;
}

export type User = UserPayload;

export type ApiError = Record<string, unknown> | string;

export type ApiResult<T> = { data: T } | { error: ApiError };
