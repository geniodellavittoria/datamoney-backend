import { Router } from 'express';
import { create, remove, get, update } from '../api/data-controller';

const dataRouter = Router();
const dataRoot = '/:userId/data';

dataRouter.post(dataRoot, create);
dataRouter.get(dataRoot, get);
dataRouter.put(dataRoot, update);
dataRouter.delete(dataRoot, remove);

export default dataRouter;
