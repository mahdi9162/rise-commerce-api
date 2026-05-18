import type { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../../utils/ApiResponse';
import status from 'http-status';

//verify
const verify = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token as string;

  const result = await AuthService.verify({ token });

  ApiResponse.success(res, result, 'Account verified successfully', status.OK);
});

// register
const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  ApiResponse.success(
    res,
    result,
    'Registration successful. Please check your email to verify your account. The verification link may also appear in your spam folder.',
    status.CREATED,
  );
});

// login
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  ApiResponse.success(res, result, 'Login Successfull', status.OK);
});

export const AuthController = {
  verify,
  register,
  login,
};
