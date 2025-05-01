import { Router } from "express";

import { ROUTES } from "./routes";
import Controller from "./controller";

const router = Router();
const controller = new Controller();

router.get(ROUTES.GET, controller.get);
router.get(ROUTES.GET_METHOD, controller.getMethod);
router.get(ROUTES.GET_CALLBACK, controller.getCallback);

export default router;
