import type { NextFunction, Request, Response } from 'express';
import env from '../../config/env';
import status from 'http-status';
import { ApiResponse } from '../../utils/ApiResponse';

const globalErrorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const message = error.message || 'Something went wrong';

  if (env.node_env === 'development') {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
      stack: error.stack,
      error,
    });
  }

  ApiResponse.error(res, message, status.INTERNAL_SERVER_ERROR);
};

export default globalErrorHandler;
