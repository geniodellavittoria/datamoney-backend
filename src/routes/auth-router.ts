import { Router } from 'express';
import { login } from '../api/auth-controller';

const authRouter = Router();

authRouter.post('/login', login);

export default authRouter;
