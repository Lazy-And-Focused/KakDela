import { Router } from "express";
import { isAuthenticated } from 'utils/middlewares';
import { createMessage } from "utils/messages/createMessage";

const router = Router();

router.get('/create', isAuthenticated, createMessage);

export default router;