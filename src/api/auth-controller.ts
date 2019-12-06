import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {ErrorMessage} from '../services/DTO/errorMessage';
import {UserLoginDto} from '../services/DTO/userDTO';
import userService from '../services/user-service';
import {User} from '../models/user';

export function login(req: Request, res: Response) {
    // find user by username
    const loginForm = req.body as UserLoginDto;
    if (loginForm == null) {
        return res.status(401).send(new ErrorMessage(401, 'Could not login. Please check role and pin.'));
    }
    userService.login(loginForm)
        .then((user: User | void)  => {
            return res.send({ token: generateAuthToken(user) });
        })
        .catch((err: any) => {
            res.status(400).json(new ErrorMessage(400, 'Could not log in user!'));
        });

}

function generateAuthToken(data: any) {
    return jwt.sign(data, 'WinterIsComingGOT2019', {algorithm: 'HS256'});
}

export function authenticate(req: Request, res: Response, next: any) {
    try {
        const authHeader = req.header('Authorization');
        if (authHeader == null) {
            return res.status(401).send(new ErrorMessage(401, 'Not Authorized'));
        }
        const token = authHeader.replace('Bearer ', '');
        const data = jwt.verify(token, 'WinterIsComingGOT2019'); // todo: remove signature or use key file
        const user = ''; // todo: get user
        if (!user) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send(new ErrorMessage(401, 'Not Authorized'));
    }
}
