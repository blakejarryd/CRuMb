//acccess env variables
require('dotenv').config()

//NPM package dependancies
const express = require('express')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()

//Configuration
PORT = process.env.PORT
const app = express()
const dbURL = process.env.MONGODB_URL
// const MongoDBStore = mongoDBSession(session)
// const sessionStore = new MongoDBStore({
//   uri: dbURL,
//   collection: 'sessions'
// })

//Router
const usersRouter = require('./src/routes/users.router')

//Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use('/users', usersRouter)

//Config
app.set('views', (__dirname + '/src/views'));

//Homepage
app.get('/', (req,res) => {
  res.render('home.ejs')
})

//DB Connection
mongoose.connect(dbURL, () => {
  console.log('Connected to userManagement db')
})

//Start Server
app.listen(PORT, () => {
  console.log("listening on port", PORT);
})