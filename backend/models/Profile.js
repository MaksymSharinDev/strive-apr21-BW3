import mongoose from 'mongoose';

let Schema = mongoose.Schema;
// noinspection JSValidateTypes
const profileSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  bio: String,
  title: String,
  area: String,
  image: String,
  username: String,
  timestamps: {
    createAt: 'crAt',
    updatedAt: 'upAt',
  },
});
const ProfileModel = mongoose.model('Model', profileSchema);

export default ProfileModel;
