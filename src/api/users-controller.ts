import { logger } from '../shared/logger';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '../shared/misc';
import { ParamsDictionary } from 'express-serve-static-core';
import { createHash } from 'crypto';
import userService from '../services/user-service';
import { UserRegisterDto, UserLoginDto } from '../services/DTO/userDTO';

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

export async function register(req: Request, res: Response) {
  try {
    const userDTO = req.body as UserRegisterDto;
    // todo: handle duplicates of user
    // add User with service
    userService.register(userDTO);
    return res.status(CREATED).send();
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
    // Update User
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
    // delete User
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    logger.info('getting all users...');
    let dto: UserLoginDto = {
      username: '',
      password: ''
    };
    var result = await userService.login(dto);
    console.log(result);
    return res.status(OK).send();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
}
