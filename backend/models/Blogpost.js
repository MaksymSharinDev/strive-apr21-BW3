import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      // image upload I guess
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    user: userSchema,
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", PostSchema);
