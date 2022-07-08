require('dotenv').config()

const mongoose = require('mongoose')

const Employees = require('../models/employee.model')
const seedEmployees = require('./seedEmployees')

const dbURL = process.env.MONGODB_URL

//DB Connection
mongoose.connect(dbURL, () => {
  console.log('Connected to crumb db')
  Employees.collection.drop()
    .then(() => {
      console.log('Dropped employees collection')
      console.log('Inserting employees seed data')
      console.log(seedEmployees)
      return Employees.insertMany(seedEmployees)
    })
    .then(() => {
      console.log('employees seed data inserted')
      mongoose.connection.close()
    })
})

