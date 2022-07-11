const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  username: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phone: {type: String},
  email: {type: String},
  password: {type: String, default: 'password'},
  sales: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}]
},
{timestamps: true}
)

const Employees = mongoose.model('Employees', employeeSchema)

module.exports = Employees
