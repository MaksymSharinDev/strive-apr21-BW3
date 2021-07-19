
import express from "express";
const router = express.Router();

router.use( express.json() )

//import serviceRouter from './service/index.js'
import experienceRouter from './experience/index.js'

//router.use( '/v1/service', serviceRouter)
router.use( '/v1/experience', experienceRouter)

export default router