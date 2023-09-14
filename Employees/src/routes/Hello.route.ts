import { Request, Router, Response } from 'express';
import HelloController from '../controllers/Hello.controller';


const helloController = new HelloController();

const router = Router();

router.get(
  '/',
  (req:Request, res:Response) => helloController.helloMessage(req, res),
);

export default router;