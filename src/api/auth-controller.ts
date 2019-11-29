import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import paketboxFileHandler from '../service/paketbox-file-handler';
import { ErrorMessage } from '../dto/errorMessage';

const AUTH_DELAY = 3 * 60 * 1000; // three minutes

export function login(req: Request, res: Response) {
  // find user by username
  let user = ''; // todo: look for user
  if (user == null) {
    return res
      .status(401)
      .send(
        new ErrorMessage(401, 'Could not login. Please check role and pin.')
      );
  }

  const token = generateAuthToken({ user: user });
  res.send({
    token: token
  });
}

function generateAuthToken(data: any) {
  return jwt.sign(data, 'WinterIsComingGOT2019', { algorithm: 'HS256' });
}

export function authenticate(req: Request, res: Response, next: any) {
  try {
    if (req.header('Authorization') == null) {
      res.status(401).send(new ErrorMessage(401, 'Not Authorized'));
    }

    const token = req.header('Authorization').replace('Bearer ', '');
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
