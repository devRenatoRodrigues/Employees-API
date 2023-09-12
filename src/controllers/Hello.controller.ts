import { Request, Response } from 'express';
import HelloService from '../services/Hello.service';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';

export default class HelloController {
    constructor(
        private _helloService = new HelloService(),
    ) { }

    public async login(_req: Request, res: Response): Promise<Response> {
        const serviceResponse = await this._helloService.helloMessage()
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

}