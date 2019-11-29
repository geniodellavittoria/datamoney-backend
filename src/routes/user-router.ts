import { Router } from 'express';
import { register, remove, update } from '../api/users-controller';

const userRouter = Router();
const userRoot = '/:id';

userRouter.post('', register);
userRouter.put(userRoot, update);
userRouter.delete(userRoot, remove);

export default userRouter;
