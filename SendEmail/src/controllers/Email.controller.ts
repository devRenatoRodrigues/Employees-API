import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import EmailService from '../services/Email.service';


export default class EmailController {
    constructor(
        private _emailService = new EmailService(),
    ) { }

    async sendEmailToAllEmployees(req: Request, res: Response): Promise<Response> {
        const { ids, message } = req.body
        console.log('control', ids, message);
        
        const serviceResponse = await this._emailService.sendEmailToAllEmployees(ids, message)
        return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
}