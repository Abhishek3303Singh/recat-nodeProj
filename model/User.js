const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/// Create our Schema
// formData.append('userName', username)
// formData.append('address', address)
// formData.append('image_file', mediaData)
// formData.append('discription', discription)

const userSchema = new Schema({
    userName:{type:String, require:true},
    address:{type:String, require:true},
    mediaData:{type:String,require:true},
    discription:{type:String, require:true}

},{timestamps:true})
const UserData = mongoose.model('InstaUserData', userSchema);
// models.exports = UserData
module.exports = UserData