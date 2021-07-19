
import express from "express";
const router = express.Router();

router.use( express.json() )

import serviceRouter from './service/index.js'

// noinspection JSCheckFunctionSignatures
router.use( '/v1/service', serviceRouter)
/*

router.use('/service', serviceRouter)
 */


export default router