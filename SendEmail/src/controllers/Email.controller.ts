import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import EmailService from '../services/Email.service';


export default class EmailController {
    constructor(
        private _emailService = new EmailService(),
    ) { }

    async sendEmailToAllEmployees(req: Request, res: Response): Promise<Response> {
        console.time()
        const { ids, message } = req.body
        
        const serviceResponse = await this._emailService.sendEmailToAllEmployees(ids, message)
        console.timeEnd()
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
}