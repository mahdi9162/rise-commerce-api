import type { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../../utils/ApiResponse';
import status from 'http-status';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  ApiResponse.success(
    res,
    result,
    'Registration successful. Please check your email to verify your account. The verification link may also appear in your spam folder.',
    status.CREATED,
  );
});

export const AuthController = {
  register,
};
