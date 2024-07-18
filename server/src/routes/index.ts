import { Router } from "express";
import MessagesRouter from './messages/messages.router';
import AuthRouter from './auth/auth.router'
import UsersRouter from './users/users.router'

const router = Router();

router.use('/messages', MessagesRouter);
router.use('/auth', AuthRouter);
router.use('/users', UsersRouter);

export default router;