import {Router} from 'express';
import { signup ,login ,logout, update, check  } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/update-profile').patch(verifyToken,update)
router.route('/check').get(verifyToken,check)

export default router;
