import { Request, Response } from 'express';
import dataService from '../services/data-service';
import { AddDataDto, GetDataDto } from '../services/DTO/dataDTO';
import { ErrorMessage } from '../services/DTO/errorMessage';
import { logger } from '../shared/logger';
import { RESET_CONTENT } from 'http-status-codes';
import { Data } from 'src/models/data';

export async function create(req: Request, res: Response) {
    const addDataDto = req.body as AddDataDto;
    dataService.add(addDataDto)
        .then((dataRes) => {
            console.log(res);
            res.send(dataRes);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(new ErrorMessage(400, 'Could not add data'));
        });
}

export async function get(req: Request, res: Response) {
    const getDataDto = req.body as GetDataDto;
    dataService.get(getDataDto)
        .then((dataRes) => {
            console.log(dataRes);
            res.send(JSON.parse(JSON.stringify(dataRes)));
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(new ErrorMessage(400, 'Could not get data'));
        });
}

export async function update(req: Request, res: Response) { }
export async function remove(req: Request, res: Response) { }
