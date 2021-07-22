import express from 'express'
import ExperienceModel from '../../../../models/Experience.js'

import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../../../../conf/cloudinary.js";
const router = express.Router({mergeParams: true});

const cloudinaryStorageCovers = new CloudinaryStorage({
    cloudinary, // grab CLOUDINARY_URL from process.env.CLOUDINARY_URL
    params: {
        folder: "expPic",
    },
});


router.post('/',
    multer({storage: cloudinaryStorageCovers}).single("expPic"),
    async (req, res) => {
        const imgUrl = req.file.path
        const expID = req.params.id
        await ExperienceModel.updateOne({ _id: expID }, { image: imgUrl  }).exec()
        res.send({
            _id : expID,
            url: imgUrl
        });
    })


export default router

