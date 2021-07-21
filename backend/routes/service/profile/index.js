import express from 'express';
import ProfileModel from '../../../models/Profile.js';
import html_to_pdf from 'html-pdf-node';
const router = express.Router();
router
  .route('/')
  // GET ALL USERS
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

    const x = async(html_to_pdf.generatePdfs(file, options)).await((output) => {
      return output; // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]
    });
    console.log(getPdf);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
