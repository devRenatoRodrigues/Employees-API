import { Request, Response } from 'express';
import mapStatusHTTP from "../utils/mapStatusHTTP.utils";
import EmployeeService from "../services/Employee.service";


export default class EmployeeController {
    constructor(
        private _employeeService = new EmployeeService(),
    ) { }

    async findAll(_req: Request, res: Response): Promise<Response> {
        const serviceResponse = await this._employeeService.findAll()
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    async findByPk(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const serviceResponse = await this._employeeService.findByPk(Number(id))
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = req.body;
        const serviceResponse = await this._employeeService.update(Number(id), data)
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const data = req.body;
        const serviceResponse = await this._employeeService.create(data)
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    async delete(req: Request, res: Response): Promise<Response>  {
        const { id } = req.params;
        const serviceResponse = await this._employeeService.delete(Number(id))
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);

    }
}