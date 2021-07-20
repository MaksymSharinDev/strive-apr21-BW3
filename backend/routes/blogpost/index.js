import express from "express";
import PostModel from "../../models/Blogpost.js";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const posts = await PostModel.find();
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newPost = new PostModel(req.body);
      await newPost.save();
      res.status(201).send(newPost);
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).send(post);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).send(`Post with ID ${post._id} has been updated!`);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await PostModel.findByIdAndDelete(req.params.id);
      res.status(200).send("post has been deleted!");
    } catch (error) {
      console.log(error);
    }
  });

export default router;
