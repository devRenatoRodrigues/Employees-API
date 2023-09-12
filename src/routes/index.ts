import { Router } from 'express';
import helloRouter from './Hello.route'

const router = Router();

router.use('/hello', helloRouter);


export default router;