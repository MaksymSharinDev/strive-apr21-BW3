import express from 'express';
import ProfileModel from '../../models/Profile.js';
import html_to_pdf from 'html-pdf-node';
const router = express.Router();
// GET ALL USERS
router
  .route('/')
  .get(async (req, res) => {
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
      console.log('cx');
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    try {
      const data = await ProfileModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      // await ProfileModel.save();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  });
router.route('/:id/picture').put(async (req, res) => {
  // console.log(req.params.id);
  try {
    await ProfileModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const foo = await ProfileModel.find();
    res.status(200).send(foo);
  } catch (error) {
    console.log(error);
  }
});

router.route('/:id/CV').get(async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await ProfileModel.findById(req.params.id);
    console.log(data);
    let options = { format: 'A4' };
    let file = [
      {
        url: 'https://www.npmjs.com/package/html-pdf-node',
        name: 'example.pdf',
      },
    ];
    const getPdf = async (file, options) => {
      const buffer = await html_to_pdf.generatePdfs(file, options);
      return getPdf;
    };
    getPdf();

    console.log(getPdf);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
