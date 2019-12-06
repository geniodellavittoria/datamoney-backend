import {Router} from 'express';
import {remove, update} from '../api/users-controller';
import {addOffer, getOffers} from '../api/offer-controller';


const offerRouter = Router();
const userId = '/:id';

// todo: fix routes
offerRouter.get('/', getOffers);
offerRouter.post('/', addOffer);
offerRouter.put(userId, update);
offerRouter.delete(userId, remove);

export default offerRouter;
