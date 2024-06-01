import { Router } from 'express';
import { sendEmail } from '../controllers/mailer';

const router = Router();

router.post('/send', sendEmail);

export default router;