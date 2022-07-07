//NPM package dependancies
const express = require('express')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const session = require('express-session')

//Configuration
const app = express()
const dbURL = 'mongodb://localhost:27017/userManagement'
const PORT = 3000

//Router
const usersRouter = require('./src/routes/users.route')

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use('/users', usersRouter)

//Config
app.set('views', (__dirname + '/src/views'));

//DB Connection
mongoose.connect(dbURL, () => {
  console.log('Connected to userManagement db')
})

//Start Server
app.listen(PORT, () => {
  console.log("listening on port", PORT);
})