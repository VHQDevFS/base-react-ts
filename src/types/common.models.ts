export interface IBaseResponse<TData = unknown> {
  data: TData;

  message?: string;

  locale?: string;
}

export interface IBaseEntity {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IBasePagination {
  total_pages: number;
  total: number;
  current_page: number;
  per: number;
}

export type IErrorValidation = {
  field: string;
  message: string;
}[];
