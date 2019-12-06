import {Request, Response} from 'express';
import {Offer} from '../models/offer';
import {ErrorMessage} from '../services/DTO/errorMessage';
import offerService from '../services/offer-service';


export async function getOffers(req: Request, res: Response) {
    offerService.getOffers()
        .then((orderRes) => {
            console.log(orderRes);
            res.send(orderRes);
        })
        .catch((err) => {
            console.log(err);
        })
}

export async function addOffer(req: Request, res: Response) {
    const offer = req.body as Offer;
    if (offer == null) {
        res.status(400).send(new ErrorMessage(400, 'Invalid offer'));
    }
    offerService.addOffer(offer)
        .then((offerRes) => {
            console.log(res);
            res.status(200).send();
        });

}
