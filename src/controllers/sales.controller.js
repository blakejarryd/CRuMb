const e = require('express')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')
const Sales = require('../models/sale.model')
const helper = require('../utils/helper')

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
  console.log(req.query)
  let pageNumber = Number(req.query.page)
  let skipAmount = 20 * (pageNumber - 1)
  console.log(pageNumber)
  Sales.find({},{},{skip: skipAmount, limit:20}).sort({date:-1})
    .then((sales) => {
      res.render('sales/indexSales.ejs', 
      {
        sales, 
        baseURL,
        pageTitle: 'Sales',
        addNew: true,
        pageNumber,
        helper: require('../utils/helper'),
        currentEmployee: req.session.currentEmployee
      })
    })
}

const showSale = (req,res) => {
  let sale = {}
  Sales.findById(req.params.id)
    .then((sale) => {
      res.render('sales/showSale.ejs', 
      {
        sale, 
        baseURL,
        pageTitle: 'Sale',
        addNew: false,
        helper: require('../utils/helper'),
        currentEmployee: req.session.currentEmployee
      })
    })
}

/*===============================================
CREATE SALE
================================================*/
const newSaleForm = (req, res) => {
  let customers = []
  let employees = []
  let today = new Date().toLocaleDateString('en-CA')
  let selectedEmployee = {}
  if (req.query.employee) {
    selectedEmployee = req.query.employee
  } else {selectedEmployee = req.session.currentEmployee._id}
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
        res.render('sales/newSale.ejs', 
        {
          baseURL,
          customers,
          selectedCustomer: req.query.customer,
          selectedEmployee,
          employees,
          pageTitle: 'New Sale',
          today,
          addNew: false,
          currentEmployee: req.session.currentEmployee._id
        })
    })
  })
}

const newSale = (req, res) => {
  let sale = req.body
  Promise.all([
    Customers.findById(req.body.customer, {name: 1, _id: 0})
    .then((res) => {
      customerName = res
    }),
    Employees.findById(req.body.employee, {firstName: 1,lastName: 1, _id: 0})
    .then((res) => {
      employeeName = res
    })]).then(() => {
      sale.customer = {
        name: customerName.name, 
        id: sale.customer,
      }
      sale.employee = {
        name: employeeName.firstName + ' ' + employeeName.lastName, 
        id: sale.employee,
      }
       Sales.create(req.body)
        .then((newSale) => {
          Employees.findByIdAndUpdate(newSale.employee.id, {$push: {sales: newSale.id}})
            .then((employee) => {})
          Customers.findByIdAndUpdate(newSale.customer.id, {$push: {sales: newSale.id}})
          .then((customer) => {})
          res.redirect(baseURL)
        })
    })
}
/*===============================================
EDIT SALE
================================================*/
const editSaleForm = (req, res) => {
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
        Sales.findById(req.params.id)
          .then((sale) => {
            res.render(('Sales/editSale.ejs'), 
            {
              sale, 
              customers,
              employees,
              baseURL,
              pageTitle: 'Edit Sale',
              addNew: false,
              currentEmployee: req.session.currentEmployee
            })
          })
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
  let customerID = ''
  let employeeID = ''
  let saleID = ''
  Sales.findByIdAndDelete(req.params.id) 
    .then((deletedSale) => {
    customerID = deletedSale.customer.id
    employeeID = deletedSale.employee.id
    saleID = deletedSale._id
    res.redirect(baseURL)
    })
    .then(() => {
      Customers.findByIdAndUpdate({customerID},{$pull: {sales: saleID}})
      Employees.findByIdAndUpdate({employeeID},{$pull: {sales: saleID}})
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