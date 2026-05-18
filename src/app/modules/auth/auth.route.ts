import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateSchema';
import { AuthValidation } from './auth.validation';

const router: Router = Router();

//verify
router.get('/verify', AuthController.verify);
// register
router.post('/register', validateRequest(AuthValidation.registerValidation), AuthController.register);

export const AuthRoutes = router;
