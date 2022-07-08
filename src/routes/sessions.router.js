//NPM package dependancies
const express = require('express')
const sessions = express.Router()
const sessionsController = require('../controllers/sessions.controller')

/*================================================================
/Login
================================================================*/
//Login Form
sessions.get('/', sessionsController.loginForm)

//Login
sessions.post('/', sessionsController.login)

/*================================================================
/Logout
================================================================*/
//Logout
sessions.delete('/', sessionsController.login)

module.exports = sessions