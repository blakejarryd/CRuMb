require('dotenv').config()

const mongoose = require('mongoose')

const Users = require('../models/user.model')
const seedUsers = require('./seedUsers')

const dbURL = process.env.MONGODB_URL

//DB Connection
mongoose.connect(dbURL, () => {
  console.log('Connected to userManagement db')
  Users.collection.drop()
    .then(() => {
      console.log('Dropped users collection')
      console.log('Inserting user seed data')
      return Users.insertMany(seedUsers)
    })
    .then(() => {
      console.log('user seed data inserted')
      mongoose.connection.close()
    })
})

