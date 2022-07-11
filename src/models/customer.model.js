const mongoose = require('mongoose')
const Schema = mongoose.Schema



const customerSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: String},
  email: {type: String},
  address: {type: String},
  contactPerson: {type: String},
  sales: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}]
},
{timestamps: true}
)

const Customers = mongoose.model('customers', customerSchema)

module.exports = Customers