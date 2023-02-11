import type { IBaseEntity } from '@/types';

export interface IUserSignIn {
  id: number;
  email: string;
  refresh_token: string;
  access_token: string;
}

export interface ICompanyModel extends IBaseEntity {
  name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  logo: string;
}

export interface ICurrentUserResponse {
  avatar: string;
  id: number;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string;
  whatsapp_number: string | null;
  language: string[];
  favourite_email_client: string | null;
  prefer_email: string | null;
  note: string | null;
  role: string;
}
