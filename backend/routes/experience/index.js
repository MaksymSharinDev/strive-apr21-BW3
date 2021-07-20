import express from 'express'

const router = express.Router();
import ExperienceModel from '../../models/Experience.js'



router.post('/', async (req, res) => {
    //TODO req validation
    //MOCK
    req.params.username = req.params.username ||  'test'
    try {
        const newExperienceObj = req.body
        newExperienceObj.username = req.params.username
        /*
        console.log('Req is: ')
        console.table(newExperienceObj)
        console.log(new Array(36).fill('-').join(''))
         */
        const {_id} = await ExperienceModel.create(newExperienceObj)
        res.status(201).send({_id})
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/', async (req, res) => {
    //TODO implement Pagination
    //MOCK
    req.params.username = req.params.username ||  'test'

    try {
        const experienceArr =
            await ExperienceModel
                .find( { username: req.params.username } )
                .exec()
        res.status(200).send( experienceArr )
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/:id', async (req, res) => {

    //MOCK
    req.params.username = req.params.username ||  'test'

    try {
        const experienceArr =
            await ExperienceModel
                .findById( req.params.id )
                .exec()
        res.status(200).send( experienceArr )
    } catch (e) {
        res.status(400).send(e)
    }
})
router.put('/:id', async (req, res) => {
    //TODO req validation
    //MOCK
    req.params.username = req.params.username ||  'test'

    try {
        const updatedExperienceObj = req.body
        const isUpdated = !!
            await ExperienceModel
                .updateOne( {_id: req.params.id } , updatedExperienceObj )
                .exec()
        res.status(200).send( isUpdated )
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/:id', async (req, res) => {
    //MOCK
    req.params.username = req.params.username ||  'test'

    try {
        const isDeleted = !!
            await ExperienceModel
                .deleteOne( { _id: req.params.id } )
                .exec()
        res.status(200).send( isDeleted )
    } catch (e) {
        res.status(500).send(e)
    }
})

export default router
