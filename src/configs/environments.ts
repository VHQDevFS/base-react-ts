export type TMode = 'production' | 'development';

export const MODE = import.meta.env.MODE as TMode;

export const isProduction = MODE === 'production';

export const isDevelopment = MODE === 'development';

export const isClient = typeof window !== 'undefined';

// env
export const API_URL = import.meta.env.VITE_API_ENDPOINT as string;

export const TIMEOUT = import.meta.env.VITE_API_TIMEOUT as number;

export const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL as string;
