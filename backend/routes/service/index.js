import express from 'express';
const router = express.Router();
import profileRouter from '../profile/index.js';

router.use('/profile', profileRouter);
export default router;
