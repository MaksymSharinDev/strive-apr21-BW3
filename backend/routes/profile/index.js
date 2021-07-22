import express from 'express';
import ProfileModel from '../../models/Profile.js';
import experienceRouter from '../experience/index.js'
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
router.route('/:id/picture').put(async (req, res) => {
  console.log(req.params.id);
  try {
    let updateImg = await ProfileModel.findById(req.params.id);
    // console.log(updateImg);
    await ProfileModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    //  await ProfileModel.save();
    const foo = await ProfileModel.find();
    res.status(200).send(foo);
  } catch (error) {
    console.log(error);
  }
});


router.use( '/:username/experiences', experienceRouter )
export default router;
