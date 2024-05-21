import { Router } from "express";
import MessagesRouter from './messages';
import AuthRouter from './auth'

const router = Router();

router.use('/messages', MessagesRouter);
router.use('/auth', AuthRouter);

export default router;