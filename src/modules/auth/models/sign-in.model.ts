import type { IUserSignIn } from './user.model';

export type ITokenStorage = Pick<IUserSignIn, 'access_token' | 'refresh_token'>;

export interface ISignInResponse {
  user: IUserSignIn;
}
