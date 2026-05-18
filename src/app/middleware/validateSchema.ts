import type { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import type z from 'zod';

const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(status.BAD_REQUEST).json({
          success: false,
          message: result.error.issues[0]?.message,
        });
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
