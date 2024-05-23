import { Router } from "express";
import MessagesRouter from './messages';
import AuthRouter from './auth'
import UsersRouter from './users'

const router = Router();

router.use('/messages', MessagesRouter);
router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);

export default router;