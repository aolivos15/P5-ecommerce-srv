import express from 'express';
import { logIn, signUp, verifyUser } from '../controllers/user.controller.js';
import { authRequire } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/verifytoken', authRequire, verifyUser);

router.post('/users', signUp);

router.post('/login', logIn);

export default router;