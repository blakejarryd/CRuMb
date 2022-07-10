//Dependancies
const express = require('express')
const sales = express.Router()
const salesController = require('../controllers/sales.controller')
const helper = require('../utils/helper')

sales.use(helper.isLoggedIn)

/*================================================================
/Users Routes
================================================================*/
//New User Form
sales.get('/new', salesController.newSaleForm)

//Create User
sales.post('/', salesController.newSale)

//Users List JSON
sales.get('/json', salesController.getSalesJSON)

//Users Index
sales.get('/', salesController.getSales)

//View User 
sales.get('/:id', salesController.showSale)

//Edit User Form
sales.get('/:id/edit', salesController.editSaleForm)

//Edit User Form
sales.put('/:id', salesController.editSale)

//Delete User
sales.delete('/:id', salesController.deleteSale)

module.exports = sales