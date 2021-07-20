
import express from "express";
const router = express.Router();
router.use( express.json() )

import experienceRouter from './experience/index.js'
import profileRouter from './profile/index.js'
router.use( '/v1/experience', experienceRouter)
router.use( '/v1/profile', profileRouter)
export default router