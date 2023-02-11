import { isClient } from '@/configs';

export interface ITokenStorage {
  access_token: string;
  refresh_token: string;
}

const SIGNATURE = 'signature';

/**
 * It returns the stored auth token from localStorage if it exists, otherwise it returns null
 * @returns The storedAuth variable is being returned.
 */
export function getStoredAuth<T = unknown>(): T | null {
  if (!isClient) return null;

  const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(SIGNATURE) : null;

  return storedAuth ? (JSON.parse(storedAuth) as T) : null;
}

export function getAccessToken(): string | null {
  const accessToken = getStoredAuth<ITokenStorage>()?.access_token;

  return accessToken ?? null;
}

export function getRefreshToken(): string | null {
  const refreshToken = getStoredAuth<ITokenStorage>()?.refresh_token;

  return refreshToken ?? null;
}

export function setStoredAuth<T = unknown>(auth: T): void {
  if (!isClient) return;

  localStorage.setItem(SIGNATURE, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
  if (!isClient) return;

  localStorage.removeItem(SIGNATURE);
}

// Set localStorage common
export function getLocalStored<T = unknown>(key: string): T | null {
  if (!isClient) return null;
  const stored = localStorage.getItem(key);

  return stored ? (JSON.parse(stored) as T) : null;
}

export function setLocalStored<T = unknown>(key: string, data: T): void {
  if (!isClient) return;

  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStored(key: string): void {
  if (!isClient) return;

  localStorage.removeItem(key);
}
