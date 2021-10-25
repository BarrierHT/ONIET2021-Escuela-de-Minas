export interface Country {
  countryCode: string;
  countryName: string;
}

export interface UserPayload {
  email: string;
  password: string;
}

export interface Barrios {
  nombre_barrio: string;
  cantidad_familias_estimado: number;
  paquetes: number;
}

export interface Estadistica {
  familias:  number;
  paquetes: number;
}

export type User = UserPayload;

export type Barrio = Barrios & {acceso_electricidad: string, acceso_cloaca: string,  acceso_agua: string};

export type ApiError = Record<string, unknown> | string;

export type ApiResult<T> = { data: T } | { error: ApiError };
