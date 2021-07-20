
import express from "express";
const router = express.Router();
router.use( express.json() )

import experienceRouter from './experience/index.js'
import profileRouter from './profile/index.js'
import blogPostsRouter from "./blogpost/index.js";
import imageRouter from "./image-upload/index.js";



router.use( '/v1/experience', experienceRouter)
router.use( '/v1/profile', profileRouter)
router.use( '/v1/blogpost', blogPostsRouter);
router.use( '/v1/image-upload', imageRouter);

export default router