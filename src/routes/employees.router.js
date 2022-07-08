//Dependancies
const express = require('express')
const employees = express.Router()
const employeesController = require('../controllers/employees.controller')
const helper = require('../utils/helper')

employees.use(helper.isLoggedIn)

/*================================================================
/Users Routes
================================================================*/
//New User Form
employees.get('/new', employeesController.newEmployeeForm)

//Create User
employees.post('/', employeesController.newEmployee)

//Users List JSON
employees.get('/json', employeesController.getEmployeesJSON)

//Users Index
employees.get('/', employeesController.getEmployees)

//View User 
employees.get('/:id', employeesController.showEmployee)

//Edit User Form
employees.get('/:id/edit', employeesController.editEmployeeForm)

//Edit User Form
employees.put('/:id', employeesController.editEmployee)

//Delete User
employees.delete('/:id', employeesController.deleteEmployee)

module.exports = employees