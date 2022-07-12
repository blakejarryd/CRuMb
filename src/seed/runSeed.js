require('dotenv').config()

const mongoose = require('mongoose')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')


const seedEmployees = require('./seedEmployees')
const seedCustomers = require('./seedCustomers')

const dbURL = process.env.MONGODB_URL

//Insert Employee Seed Data
mongoose.connect(dbURL, () => {
  if (Employees.collection) {
    Employees.collection.drop()
      .then(() => {
      Employees.insertMany(seedEmployees)
        .then(() => {
          mongoose.connection.close()
        })
    })
  } else {
    Employees.insertMany(seedEmployees)
      .then(() => {
        mongoose.connection.close()
    })
  }
  console.log('employee seed data inserted')
})

//Insert Client Seed Data
mongoose.connect(dbURL, () => {
  if (Customers.collection) {
    Customers.collection.drop()
      .then(() => {
      Customers.insertMany(seedCustomers)
        .then(() => {
          mongoose.connection.close()
        })
    })
  } else {
    Customers.insertMany(seedCustomers)
      .then(() => {
        mongoose.connection.close()
    })
  }
  console.log('customer seed data inserted')
})



