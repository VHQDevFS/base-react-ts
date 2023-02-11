export enum MainPaths {
  DASHBOARD = '/',
}

export enum ContactsPaths {
  CONTACTS = '/contact',
  CONTACTS_DETAIL = '/contact/:id',
}

export enum ProfilesPath {
  PROFILE = '/profile',
  EDIT_PROFILE = '/profile/edit',
  CHANGE_PASSWORD_PROFILE = '/profile/change-password',
  BILLING_PLAN = '/profile/Billing&Plan',
}

export enum AuthPaths {
  AUTH = '/auth',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  VERIFY_CODE = '/verify-code',
  RESET_PASSWORD = '/reset-password',
}

export enum SubscriptionPaths {
  SUBSCRIPTION = '/subscription-plan',
}

export enum ErrorPaths {
  UNAUTHORIZED = '/unauthorized',
  ALL = '*',
  NOT_FOUND = '/not-found',
}

export enum TemplatePaths {
  TEMPLATE = '/template',
  TEMPLATE_CREATE_EMAIL = '/template/create-email',
  TEMPLATE_CREATE_WHATSAPP = '/template/create-whatsapp',
  TEMPLATE_CREATE_SMS = '/template/create-sms',
  TEMPLATE_PREVIEW_WHATSAPP = '/template/preview-whatsapp',
}

export const APP_ROUTES_PATHS = {
  ...MainPaths,
  ...ProfilesPath,
  ...AuthPaths,
  ...ErrorPaths,
  ...ContactsPaths,
  ...TemplatePaths,
  ...SubscriptionPaths,
} as const;

export type AppRouteType = typeof APP_ROUTES_PATHS;
