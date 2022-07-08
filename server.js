//acccess env variables
require('dotenv').config()

//NPM package dependancies
const express = require('express')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')

//Configuration
PORT = process.env.PORT
const app = express()
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})

//Routers
const usersRouter = require('./src/routes/users.router')
const sessionsRouter = require('./src/routes/sessions.router')

//Middleware
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: 0.5 * 60 * 60 * 1000
  }
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use('/users', usersRouter)
app.use('/', sessionsRouter)

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