//NPM package dependancies
const express = require('express')
const sessions = express.Router()
const sessionsController = require('../controllers/sessions.controller')

/*================================================================
/Login
================================================================*/
//Login Form
sessions.get('/login', sessionsController.loginForm)

//Login
sessions.post('/login', sessionsController.login)

/*================================================================
/Logout
================================================================*/
//Logout
sessions.delete('/logout', sessionsController.logout)

module.exports = sessions