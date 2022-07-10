const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salesSchema = new Schema({
  date: {type: Date},
  amount: {type: Number},
  description: {type: String},
  employee: {type: String},
})

const customerSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: String},
  email: {type: String},
  address: {type: String},
  contactPerson: {type: String},
  relationshipManager: {type: String},
  sales: [salesSchema]
},
{timestamps: true}
)

const Customers = mongoose.model('customers', customerSchema)

module.exports = Customers