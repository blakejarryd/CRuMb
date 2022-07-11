const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema({
  date: {type: Date},
  customerName: {type: String},
  amount: {type: Number},
  description: {type: String},
  salesPerson: {type: String},
  customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  employee: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
},
{timestamps: true}
)

const Sales = mongoose.model('sales', saleSchema)

module.exports = Sales