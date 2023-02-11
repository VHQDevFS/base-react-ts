import { Navigate } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/libs/utils';

const { LayoutAuth } = lazyImport(() => import('@/components/layouts'), 'LayoutAuth');

const { PublicRoute } = lazyImport(() => import('../public-route'), 'PublicRoute');

const { SignInPage } = lazyImport(() => import('@/modules/auth'), 'SignInPage');

const { SignUpPage } = lazyImport(() => import('@/modules/auth'), 'SignUpPage');

const { ForgotPasswordPage } = lazyImport(() => import('@/modules/auth'), 'ForgotPasswordPage');

const { VerifyCodePage } = lazyImport(() => import('@/modules/auth'), 'VerifyCodePage');

const { ResetPasswordPage } = lazyImport(() => import('@/modules/auth'), 'ResetPasswordPage');

const { ErrorPage } = lazyImport(() => import('../error-page'), 'ErrorPage');

export function authRoutes(): RouteObject {
  return {
    path: '/auth',
    element: (
      <PublicRoute>
        <LayoutAuth />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="sign-in" /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'verify-code', element: <VerifyCodePage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  };
}
