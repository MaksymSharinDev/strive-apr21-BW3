import express from 'express'
import {sendCVS} from "./jsonToCvs.js";

const router = express.Router({mergeParams: true});
import ExperienceModel from '../../../../models/Experience.js'


router.get('/', async (req, res, next) => {
    const username = req.params.username
    const experienceArr = await ExperienceModel.find({username}).exec()
    console.log(experienceArr)
    sendCVS(res, `$experiences-${username}`,
        ['role', 'company', 'description', 'area', 'startDate', 'endDate'],
        experienceArr)
})


export default router

