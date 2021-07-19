import mongoose from 'mongoose';

let Schema = mongoose.Schema;
// noinspection JSValidateTypes
const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: false },
    username: { type: String, required: true },
  },
  { timestamps: true }
);
const ProfileModel = mongoose.model('Model', profileSchema);

export default ProfileModel;
