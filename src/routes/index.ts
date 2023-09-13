import { Router } from 'express';
import helloRouter from './Hello.route'
import employeeRouter from './Employee.route'

const router = Router();

router.use('/hello', helloRouter);

router.use('/employee', employeeRouter);

export default router;