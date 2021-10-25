import {
  ApiResult,
  User,
  UserPayload,
  Barrios,
  Barrio,
  Estadistica,
} from '@lib/payloads';
import Cookies from 'js-cookie';

const apiHost = import.meta.env.PROD ? window.location.host : 'localhost:5000';

const getCSRFToken = (): string => Cookies.get('XSRF-TOKEN') ?? '';

const defaultOptions: () => RequestInit = () => ({
  method: 'POST',
  headers: {
    Accepts: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken(),
  },
  credentials: import.meta.env.PROD
    ? ('same-origin' as const)
    : ('include' as const),
});

export async function getUser(): Promise<User | null> {
  const result = (await fetch(
    `http://${apiHost}/api/getUser`,
    defaultOptions()
  ).then((v) => v.json())) as ApiResult<UserPayload>;
  if ('error' in result) throw result.error;
  return result.data;
}

export async function logIn(email: string, password: string): Promise<User> {
  const result = (await fetch(`http://${apiHost}/api/logIn`, {
    ...defaultOptions(),
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((v) => v.json())) as ApiResult<UserPayload>;
  if ('error' in result) throw result.error;
  return result.data;
}

export async function logOut(): Promise<void> {
  const result = (await fetch(
    `http://${apiHost}/api/logOut`,
    defaultOptions()
  ).then((v) => v.json())) as ApiResult<undefined>;
  if ('error' in result) throw result.error;
}

export async function getBarrios(
  provincia_id: string,
  departamento_id: string,
  localidad: string,
  page = 0
): Promise<[Barrios] | null> {
  const result = (await fetch(
    `http://${apiHost}/api/barrios?provincia=${provincia_id}&departamento=${departamento_id}&localidad=${localidad}?page=${page}`,
    {
      ...defaultOptions(),
      method: 'GET',
    }
  ).then((v) => v.json())) as ApiResult<[Barrios]>;

  if ('error' in result) throw result.error;

  return result.data;
}

export async function getBarrio(barrio_id: string): Promise<Barrio> {
  const result = (await fetch(`http://${apiHost}/api/barrio/${barrio_id}`, {
    ...defaultOptions(),
    method: 'GET',
  }).then((v) => v.json())) as ApiResult<Barrio>;

  if ('error' in result) throw result.error;

  return result.data;
}

export async function postPaquetes(
  paquetes: string,
  barrio_id: string
): Promise<void> {
  const result = (await fetch(`http://${apiHost}/api/paquetes/${barrio_id}`, {
    ...defaultOptions(),
    body: JSON.stringify({ inc: paquetes }),
  }).then((v) => v.json())) as ApiResult<undefined>;

  if ('error' in result) throw result.error;
}

export async function generarEstadistica(
  cod_provincia: string,
  cod_departamento: string,
  cod_localidad: string
): Promise<Estadistica> {
  const result = (await fetch(`http://${apiHost}/api/generarEstadistica`, {
    ...defaultOptions(),
    body: JSON.stringify({
      cod_provincia,
      cod_depto: cod_departamento,
      localidad: cod_localidad,
    }),
  }).then((v) => v.json())) as ApiResult<Estadistica>;

  if ('error' in result) throw result.error;

  return result.data;
}

export async function listarBarrios(n: number): Promise<Barrio> {
  const result = (await fetch(`http://${apiHost}/api/nBarrios`, {
    ...defaultOptions(),
    body: JSON.stringify({ n }),
  }).then((v) => v.json())) as ApiResult<Barrio>;

  if ('error' in result) throw result.error;

  return result.data;
}
