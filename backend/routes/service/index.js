import express from "express";
const router = express.Router();
import blogPostsRouter from "./blogpost/index.js";
import imageRouter from "./image-upload/index.js";

router.use("/blogposts", blogPostsRouter);
router.use("/image-upload", imageRouter);

// router.post("/", (req, res) => {});
// router.get("/", (req, res) => {});
// router.get("/:id", (req, res) => {});
// router.put("/:id", (req, res) => {});
// router.delete("/:id", (req, res) => {});

export default router;
