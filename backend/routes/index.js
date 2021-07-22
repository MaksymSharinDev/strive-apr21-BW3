
import express from "express";
const router = express.Router();
router.use( express.json() )


import profileRouter from './profile/index.js'
import blogPostsRouter from "./blogpost/index.js";
import imageRouter from "./image-upload/index.js";


router.use( '/v1/profile', profileRouter)
router.use( '/v1/blogposts', blogPostsRouter);
router.use( '/v1/image-upload', imageRouter);

export default router