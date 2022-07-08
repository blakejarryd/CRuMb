//Dependancies
const express = require('express')
const users = express.Router()
const usersController = require('../controllers/users.controller')
const helper = require('../utils/helper')

users.use(helper.isLoggedIn)

/*================================================================
/Users Routes
================================================================*/
//New User Form
users.get('/new', usersController.newUserForm)

//Create User
users.post('/', usersController.newUser)

//Users List JSON
users.get('/json', usersController.getUsersJSON)

//Users Index
users.get('/', usersController.getUsers)

//View User 
users.get('/:id', usersController.showUser)

//Edit User Form
users.get('/:id/edit', usersController.editUserForm)

//Edit User Form
users.put('/:id', usersController.editUser)

//Delete User
users.delete('/:id', usersController.deleteUser)

module.exports = users