/*
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "image": ... //server generated on upload, set a default here
    }
*/

import mongoose from 'mongoose'
import 'mongoose-type-url'
const Url = mongoose.SchemaTypes.Url;
const Date = mongoose.SchemaTypes.Date;

let Schema = mongoose.Schema

const modelSchema = new Schema( {
    "role": String,
    "company": String,
    "description": String,
    "area": String,
    "username": String,
    "startDate": Date,
    "endDate": Date,
    "image": Url,
} );
modelSchema.set('timestamps', true)
const Experience = mongoose.model('Experience', modelSchema);
export default Experience