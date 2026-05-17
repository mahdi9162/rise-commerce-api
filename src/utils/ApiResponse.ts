import type { Response } from 'express';
import type { TApiResponse } from '../types';

const success = <T>(res: Response, data: T, message: string, statusCode: number = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } as TApiResponse<T>);
};

const error = (res: Response, message: string, statusCode: number = 500, errorDetails?: unknown) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};

export const ApiResponse = {
  success,
  error,
};
