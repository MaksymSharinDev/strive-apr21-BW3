import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

const cloudinaryStorageCovers = new CloudinaryStorage({
  cloudinary, // grab CLOUDINARY_URL from process.env.CLOUDINARY_URL
  params: {
    folder: "blog-post",
  },
});
router
  .route("/")
  .post(
    multer({ storage: cloudinaryStorageCovers }).single("cover"),
    async (req, res) => {
      res.send({ url: req.file.path });
    }
  );

export default router;
