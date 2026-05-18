import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateSchema';
import { AuthValidation } from './auth.validation';
import { register } from 'node:module';

const router: Router = Router();

// register
router.post('/register', validateRequest(AuthValidation.registerValidation), AuthController.register);


export const AuthRoutes = router;
