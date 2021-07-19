import express from 'express';
import ProfileModel from '../../../models/Profile.js';
const router = express.Router();
router.route('/profile').get(async (req, res) => {
  try {
    const profiles = await ProfileModel.find();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
});
