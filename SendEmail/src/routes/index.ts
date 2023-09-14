import { Router } from 'express';
import emailRouter from './Email.routes'

const router = Router();

router.use('/send-notification', emailRouter);

export default router;