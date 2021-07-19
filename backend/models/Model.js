import mongoose from 'mongoose'

let Schema = mongoose.Schema
// noinspection JSValidateTypes
const modelSchema = new Schema( {
    key: String
} );
modelSchema.set('timestamps', true)
const Model = mongoose.model('Model', modelSchema);
export default Model

