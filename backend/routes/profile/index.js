import express from 'express';
import ProfileModel from '../../models/Profile.js';
import experienceRouter from './experience/index.js';
import Experience from '../../models/Experience.js';
import { generatePdfs } from 'html-pdf-node';
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
router.route('/:id/CV').get(async (req, res) => {
  //console.log(req.params.id);
  try {
    const userProfile = await ProfileModel.findById(req.params.id);
    const userName = userProfile.name;
    const userSurname = userProfile.surname;
    const userEmail = userProfile.email;
    const userTitle = userProfile.title;
    const userArea = userProfile.area;
    const userImg = userProfile.image;
    const userIdName = userProfile.username;
    console.log(userIdName);
    //TODO: multiple exp must be fetched
    const userExperience = await Experience.findOne({
      username: userProfile.username,
    }).exec();
    console.log(userExperience);
    const userRole = userExperience.role;
    const userCompany = userExperience.company;
    const userDescription = userExperience.descritption;
    const userStartDate = userExperience.startDate;
    const userEndDate = userExperience.endDate;

    const getPdf = () => {
      let options = { format: 'A4', pageRanges: '1' };
      let file = [
        {
          content: `<html><body style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;vertical-align:baseline;line-height:17px;background-color:#e1e0db;background-image:url(../images/bg.jpg);background-repeat:repeat;color:#000;"><div id="wrapper" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:969px;margin-top:60px;margin-bottom:100px;"> <div class="wrapper-top" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:969px;height:19px;background-image:url(../images/btop.jpg);background-repeat:no-repeat;"></div><div class="wrapper-mid" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:969px;background-image:url(../images/bmid.jpg);background-repeat:repeat-y;padding-bottom:40px;"> <div id="paper" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:828px;"> <div class="paper-top" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:828px;background-image:url(../images/ptop.jpg);background-repeat:no-repeat;height:0;"></div><div id="paper-mid" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:828px;background-image:url(../images/pmid.jpg);background-repeat:repeat-y;display:block;overflow:hidden;padding-bottom:75px;padding-top:7px;"> <div class="entry" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:720px;display:block;padding-top:55px;clear:both;margin-left:4px;"> <img class="portrait" src=${userImg} alt="John Smith" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;background-image:url(../images/frame.jpg);background-repeat:no-repeat;width:109px;height:109px;padding-top:20px;padding-left:11px;padding-right:11px;padding-bottom:36px;margin-left:50px;float:left;"><div class="self" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:250px;float:left;padding-top:11px;margin-left:38px;margin-bottom:15px;"> <h1 class="name" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:42px;font-family:inherit;vertical-align:baseline;width:250px;color:#1b4491;margin-bottom:3px;clear:both;">${userName} ${userSurname}<br><span style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:21px;font-family:inherit;vertical-align:baseline;display:block;color:#1b4491;margin-top:-5px;">${userTitle}</span></h1> <ul style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;padding-top:10px;"><li class="ad" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;background-repeat:no-repeat;padding-left:26px;background-position:0 .1em;height:25px;display:block;margin-top:-2px;background-image:url(../images/icn-ad.gif);">111 Lorem Street, 34785, Ipsum City</li><li class="mail" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;background-repeat:no-repeat;padding-left:26px;background-position:0 .1em;height:25px;display:block;margin-top:-2px;background-image:url(../images/icn-mail.gif);">${userEmail}</li><li class="tel" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;background-repeat:no-repeat;padding-left:26px;background-position:0 .1em;height:25px;display:block;margin-top:-2px;background-image:url(../images/icn-tel.gif);">+11 444 555 22 33</li><li class="web" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;background-repeat:no-repeat;padding-left:26px;background-position:0 .1em;height:25px;display:block;margin-top:-2px;background-image:url(../images/icn-web.gif);">www.businessweb.com</li></ul></div><div class="entry" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:720px;display:block;padding-top:55px;clear:both;margin-left:4px;"> <h2 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:22px;font-family:inherit;vertical-align:baseline;width:180px;height:23px;text-align:right;float:left;clear:both;color:#1b4491;margin-bottom:-12px;">OBJECTIVE</h2> <p style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:500px;margin-left:40px;float:right;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim viverra nibh sed varius. Proin bibendum nunc in sem ultrices posuere. Aliquam ut aliquam lacus.</p></div><div class="entry" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:720px;display:block;padding-top:55px;clear:both;margin-left:4px;"> <h2 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:22px;font-family:inherit;vertical-align:baseline;width:180px;height:23px;text-align:right;float:left;clear:both;color:#1b4491;margin-bottom:-12px;">EDUCATION</h2> <div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">Sep 2005 - Feb 2007</h3> <p style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:500px;margin-left:40px;float:right;">Academy of Art University, London <br><em style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:italic;font-size:12px;font-family:Georgia, "Times New Roman", serif;vertical-align:baseline;color:#777777;display:block;padding-top:3px;">Master in Communication Design</em></p></div><div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">Sep 2001 - Jun 2005</h3> <p style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:500px;margin-left:40px;float:right;">University of Art &amp; Design, New York <br><em style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:italic;font-size:12px;font-family:Georgia, "Times New Roman", serif;vertical-align:baseline;color:#777777;display:block;padding-top:3px;">Bachelor of Science in Graphic Design</em></p></div></div><div class="entry" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:720px;display:block;padding-top:55px;clear:both;margin-left:4px;"> <h2 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:22px;font-family:inherit;vertical-align:baseline;width:180px;height:23px;text-align:right;float:left;clear:both;color:#1b4491;margin-bottom:-12px;">EXPERIENCE</h2> <div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">May 2009 - Feb 2010</h3> <p style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:500px;margin-left:40px;float:right;">Agency Creative, London <br><em style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:italic;font-size:12px;font-family:Georgia, "Times New Roman", serif;vertical-align:baseline;color:#777777;display:block;padding-top:3px;">Senior Web Designer</em></p><ul class="info" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:right;width:500px;margin-left:40px;list-style-type:none;"><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;display:block;width:500px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:12px;">Vestibulum eu ante massa, sed rhoncus velit.</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;display:block;width:500px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:12px;">Pellentesque at lectus in <a href="#" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;color:#7b90b5;text-decoration:none;">libero dapibus</a> cursus. Sed arcu ipsum, varius at ultricies acuro, tincidunt iaculis diam.</li></ul></div><div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">Jun 2007 - May 2009</h3> <p style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:500px;margin-left:40px;float:right;">Junior Web Designer <br><em style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:italic;font-size:12px;font-family:Georgia, "Times New Roman", serif;vertical-align:baseline;color:#777777;display:block;padding-top:3px;">Bachelor of Science in Graphic Design</em></p><ul class="info" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:right;width:500px;margin-left:40px;list-style-type:none;"><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;display:block;width:500px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:12px;">Sed fermentum sollicitudin interdum. Etiam imperdiet sapien in dolor rhoncus a semper tortor posuere. </li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;display:block;width:500px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:12px;">Pellentesque at lectus in libero dapibus cursus. Sed arcu ipsum, varius at ultricies acuro, tincidunt iaculis diam.</li></ul></div></div><div class="entry" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:720px;display:block;padding-top:55px;clear:both;margin-left:4px;"> <h2 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:22px;font-family:inherit;vertical-align:baseline;width:180px;height:23px;text-align:right;float:left;clear:both;color:#1b4491;margin-bottom:-12px;">SKILLS</h2> <div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">Software Knowledge</h3> <ul class="skills" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:right;width:500px;margin-left:40px;margin-top:-6px;list-style-type:none;"><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Photoshop</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Illustrator</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">InDesign</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Flash</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Fireworks</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Dreamweaver</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">After Effects</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Cinema 4D</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Maya</li></ul></div><div class="content" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;overflow:hidden;display:block;padding-top:32px;"> <h3 style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:13px;font-family:inherit;vertical-align:baseline;width:180px;text-align:right;float:left;clear:both;color:#7b90b5;">Languages</h3> <ul class="skills" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:right;width:500px;margin-left:40px;margin-top:-6px;list-style-type:none;"><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">CSS/XHTML</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">PHP</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">JavaScript</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">Ruby on Rails</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">ActionScript</li><li style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;float:left;width:156px;background-image:url(../images/bullet.gif);background-repeat:no-repeat;padding-left:10px;background-position:0 .5em;margin-top:6px;">C++</li></ul></div></div></div><div class="clear" style="margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;clear:both;"></div><div class="paper-bottom" style="margin:0 auto;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;width:828px;height:18px;background-image:url(../images/pbottom.jpg);background-repeat:no-repeat;"></div></div></div></div></body></html>`,
          name: 'example.pdf',
        },
      ];
      return new Promise((resolve, reject) => {
        generatePdfs(file, options).then((output) => {
          resolve(output);
        });
      });
    };
    const x = await getPdf();
    const data = await x[0];
    const bufferObject = await data.buffer;
    //const bufferr = await bufferObject.data;
    console.log(bufferObject);
    res.header('Content-type', 'application/pdf');
    res.send(bufferObject);
  } catch (error) {
    console.log(error);
  }
});

router.use('/:username/experiences', experienceRouter);
export default router;
