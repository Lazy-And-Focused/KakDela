import { Router } from "express";
import { isAuthenticated } from 'utils/middlewares';

import { createMessageController } from "controllers/messages/create-message.controller";
import { getMessageController } from "controllers/messages/get-message.controller";
import { deleteMessageController } from "controllers/messages/delete-message.controller";

const router = Router();

router.post('/create', isAuthenticated, createMessageController);
router.get('/:channelId/:messageId', isAuthenticated, getMessageController);
router.delete('/:channelId/:messageId', isAuthenticated, deleteMessageController);

export default router;