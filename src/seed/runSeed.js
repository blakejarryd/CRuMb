require('dotenv').config()

const mongoose = require('mongoose')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')
const Sales = require('../models/sale.model')



const seedEmployees = require('./seedEmployees')
const seedCustomers = require('./seedCustomers')
const seedSales = require('./seedSales')

const dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, () => {
  Promise.all([
    Employees.collection.drop(),
    Customers.collection.drop(),
    Sales.collection.drop(),
  ]).then(() => {
    Promise.all([
      Employees.insertMany(seedEmployees)
      .then(() => {
        console.log('employee seed data inserted')
      }),
      Customers.insertMany(seedCustomers)
      .then(() => {
        console.log('customer seed data inserted')
      }),
    ]).then(() => {
      seedSales.generateSales(100)
    }).then(() => {
      console.log('sales seed data inserted')
    })
  })
})
  
    





