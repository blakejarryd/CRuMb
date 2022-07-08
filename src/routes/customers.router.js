//Dependancies
const express = require('express')
const customers = express.Router()
const customersController = require('../controllers/customers.controller')
const helper = require('../utils/helper')

customers.use(helper.isLoggedIn)

/*================================================================
/Users Routes
================================================================*/
//New User Form
customers.get('/new', customersController.newCustomerForm)

//Create User
customers.post('/', customersController.newCustomer)

//Users List JSON
customers.get('/json', customersController.getCustomersJSON)

//Users Index
customers.get('/', customersController.getCustomers)

//View User 
customers.get('/:id', customersController.showCustomer)

//Edit User Form
customers.get('/:id/edit', customersController.editCustomerForm)

//Edit User Form
customers.put('/:id', customersController.editCustomer)

//Delete User
customers.delete('/:id', customersController.deleteCustomer)

module.exports = customers