import { Request, Response } from 'express';
import mapStatusHTTP from "../utils/mapStatusHTTP.utils";
import PopulateService from '../services/Populate.service';


export default class PopulateController {
    constructor(
        private _populateService = new PopulateService(),
    ) { }

    async populateEmployees(_req: Request, res: Response): Promise<Response> {
        const serviceResponse = await this._populateService.populateEmployees();
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    };
};