const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phone: {type: String},
  email: {type: String},
  password: {type: String, default: 'password'}
},
{timestamps: true}
)

const Users = mongoose.model('Users', userSchema)

module.exports = Users
