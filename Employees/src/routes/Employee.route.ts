import { Request, Router, Response } from 'express';
import EmployeeController from '../controllers/Employee.controller';


const employeeController = new EmployeeController();

const router = Router();

router.get(
  '/',
  (req:Request, res:Response) => employeeController.findAll(req, res),
);

router.get(
    '/:id',
    (req:Request, res:Response) => employeeController.findByPk(req, res),
  );

  router.post(
    '/',
    (req:Request, res:Response) => employeeController.create(req, res),
  );

  router.patch(
    '/:id',
    (req:Request, res:Response) => employeeController.update(req, res),
  );

  router.delete(
    '/:id',
    (req:Request, res:Response) => employeeController.delete(req, res),
  );

export default router;