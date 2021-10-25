import { ApiResult, User, UserPayload } from '@lib/payloads';
import Cookies from 'js-cookie';

const apiHost = import.meta.env.PROD ? window.location.host : 'localhost:5000';
// FIXME: Make CSRF work
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
