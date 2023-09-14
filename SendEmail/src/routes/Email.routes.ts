import { Request, Router, Response } from 'express';
import EmailController from '../controllers/Email.controller';


const emailController = new EmailController();

const router = Router();

router.post(
  '/',
  (req:Request, res:Response) => emailController.sendEmailToAllEmployees(req, res),
);

export default router;