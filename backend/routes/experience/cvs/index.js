import express from 'express'
import {sendCVS} from "./jsonToCvs.js";

const router = express.Router({mergeParams: true});
import ExperienceModel from '../../../models/Experience.js'


router.get('/', async (req, res, next) => {
    const profileID = req.params.id
    const experienceArr = await ExperienceModel.find({profileID}).exec()
    console.log(experienceArr)
    sendCVS(res, `$experiences-${profileID}`,
        ['role', 'company', 'description', 'area', 'startDate', 'endDate'],
        experienceArr)
})


export default router

