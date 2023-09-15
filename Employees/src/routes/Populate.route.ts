import { Request, Router, Response } from 'express';
import PopulateController from '../controllers/Populate.controller';


const populateController = new PopulateController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => populateController.populateEmployees(req, res),
);

export default router;