import { Router } from 'express';
import helloRouter from './Hello.route'
import employeeRouter from './Employee.route'
import populateRouter from './Populate.route'

const router = Router();

router.use('/hello', helloRouter);

router.use('/employees', employeeRouter);

router.use('/populate', populateRouter);

export default router;