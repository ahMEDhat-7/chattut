import {Router} from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { findUsers,getMessage,sendMessage } from '../controllers/message.controller.js';

const router = Router();

router.route("/users").get(verifyToken,findUsers);
router.route("/:id").get(verifyToken,getMessage);

router.route("/send/:id").post(verifyToken,sendMessage)


export default router;
