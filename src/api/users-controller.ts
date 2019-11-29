import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

export async function register(req: Request, res: Response) {
  try {
    const userDTO = req.body;
    if (!userDTO) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    //add User with service
    return res.status(CREATED).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

export async function update(req: Request, res: Response) {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    user.id = Number(user.id);
    //Update User
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params as ParamsDictionary;
    //delete User
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}
