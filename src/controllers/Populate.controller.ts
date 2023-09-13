import { Request, Response } from 'express';
import mapStatusHTTP from "../utils/mapStatusHTTP.utils";
import EmployeeService from "../services/Employee.service";
import PopulateService from '../services/Populate.service';


export default class EmployeeController {
    constructor(
        private _populateService = new PopulateService(),
    ) { }

    async populateEmployees(_req: Request, res: Response): Promise<Response> {
        const serviceResponse = await this._populateService.populateEmployees()
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
}