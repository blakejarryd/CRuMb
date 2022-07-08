//NPM package dependancies
const express = require('express')
const sessions = express.Router()
const sessionsController = require('../controllers/sessions.controller')

/*================================================================
/Login Routes
================================================================*/
//Login Form
sessions.get('/', sessionsController.loginForm)


module.exports = sessions