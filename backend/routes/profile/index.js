import express from 'express';
import ProfileModel from '../../models/Profile.js';
const router = express.Router();
// GET ALL USERS
router.route('/').get(async (req, res) => {
    try {
      const profiles = await ProfileModel.find();
      res.status(200).send(profiles);
    } catch (error) {
      console.log(error);
    }
  })

  // Create the user profile
  .post(async (req, res) => {
    const newProfile = new ProfileModel(req.body);
    try {
      await newProfile.save();
      res.send(newProfile);
    } catch (error) {
      console.log(error);
    }
  });

//

router
  .route('/:id')
  // GET USER BY ID
  .get(async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.params.id);
      res.status(200).send(profile);
    } catch (error) {
      console.log(error);
    }
  })
  .patch(async (req, res) => {
    try {
      await ProfileModel.findByIdAndUpdate(req.params.id, req.body);
      await ProfileModel.save();
      res.status(200).send(ProfileModel);
    } catch (error) {
      console.log(error);
    }
  });

export default router;
