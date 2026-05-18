export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type TSendEmail = {
  to: string;
  subject: string;
  html: string;
};