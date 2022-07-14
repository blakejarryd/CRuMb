//Dependancies
const express = require('express')
const sales = express.Router()
const salesController = require('../controllers/sales.controller')
const helper = require('../utils/helper')

sales.use(helper.isLoggedIn)

/*================================================================
/SALES ROUTES
================================================================*/
//New Sale Form
sales.get('/new', salesController.newSaleForm)

//Create Sale
sales.post('/', salesController.newSale)

//Sales List JSON
sales.get('/json', salesController.getSalesJSON)

//Sales Index
sales.get('/', salesController.getSales)

//View Sale 
sales.get('/:id', salesController.showSale)

//Edit Sale Form
sales.get('/:id/edit', salesController.editSaleForm)

//Edit Sale Form
sales.put('/:id', salesController.editSale)

//Delete Sale
sales.delete('/:id', salesController.deleteSale)

module.exports = sales