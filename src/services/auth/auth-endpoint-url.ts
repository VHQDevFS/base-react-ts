import type { StringNumeric } from '@/types';

const ENDPOINT_QUERIES = {
  currentUserInfo: 'current-user-infor',
} as const;

const ENDPOINT_MUTATIONS = {
  signIn: 'login',

  signUp: 'signup',

  resetPassword: 'reset-password',

  verifyCode: 'reset-password/edit',

  logout: 'logout',

  changePassword: 'change-password',

  changeProfile: (userId: StringNumeric) => `users/${userId}`,
} as const;

export const AUTH_ENDPOINT_URL = {
  ...ENDPOINT_QUERIES,
  ...ENDPOINT_MUTATIONS,
} as const;
