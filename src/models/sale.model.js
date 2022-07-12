const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema({
  date: {type: Date},
  customer: {
    name:{type: String}, 
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
    },
  employee: {
    name: {type: String}, 
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}
    },
  amount: {type: Number},
  description: {type: String},
},
{timestamps: true}
)

const Sales = mongoose.model('sales', saleSchema)

module.exports = Sales