const e = require('express')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')
const Sales = require('../models/sale.model')

const baseURL = '/sales'

/*===============================================
GET SALES
================================================*/
const getSalesJSON = (req,res) => {
  Sales.find()
    .then((sales) => {
      res.send(sales)
    })
}

const getSales = (req,res) => {
  Sales.find()
    .then((sales) => {
      res.render('sales/indexSales.ejs', 
      {
        sales, 
        baseURL,
        pageTitle: 'Sales',
        currentEmployee: req.session.currentEmployee
      })
    })
}

const showSale = (req,res) => {
  Sales.findById(req.params.id)
    .then((sale) => {
      res.render('sales/showSale.ejs', 
      {
        sale, 
        baseURL,
        pageTitle: 'Sale',
        currentEmployee: req.session.currentEmployee
      })
    })
}

/*===============================================
CREATE SALE
================================================*/
const newSaleForm = (req, res) => {
  customers = []
  employees = []
  Customers.find({}, {name: 1})
    .then((result) => {
      customers = result
    })
    .then(() => {
      Employees.find({}, {firstName: 1, lastName: 1})
      .then((result) => {
        employees = result
      })
      .then(() => {
        console.log(customers)
        console.log(employees)
        res.render('sales/newSale.ejs', 
        {
          baseURL,
          customers,
          employees,
          pageTitle: 'New Sale',
          currentEmployee: req.session.currentEmployee
        })
    })
  })
}

const newSale = (req, res) => {
  Customers.findOne({name:req.body.customerName}, {_id: 1})
  .then((customerID) => {req.body.customer = customerID})
    .then(() => {
      Employees.findOne({name:req.body.salesPerson}, {_id: 1})
      .then((employeeID) => {req.body.employee = employeeID})
        .then(() => {
          Sales.create(req.body)
          .then((newSale) => {
            res.redirect(baseURL)
          })
        })
    })
}

/*===============================================
EDIT SALE
================================================*/
const editSaleForm = (req, res) => {
  Sales.findById(req.params.id)
    .then((sale) => {
      res.render(('Sales/editSale.ejs'), 
      {
        sale, 
        baseURL,
        pageTitle: 'Edit Sale',
        currentEmployee: req.session.currentEmployee
      })
    })
}

const editSale = (req, res) => {
  Sales.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then((updatedSale) => {
      res.redirect(baseURL + '/' + req.params.id)
    })
}

/*===============================================
DELETE SALE
================================================*/
const deleteSale = (req, res) => {
  Sales.findByIdAndDelete(req.params.id) 
    .then((deletedSale) => {
    res.redirect(baseURL)
    })
}


module.exports = {
  getSalesJSON,
  getSales,
  showSale,
  newSaleForm,
  newSale,
  editSaleForm,
  editSale,
  deleteSale,
}