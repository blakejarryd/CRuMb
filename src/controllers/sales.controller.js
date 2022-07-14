const e = require('express')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')
const Sales = require('../models/sale.model')
const helper = require('../utils/helper')

const baseURL = '/sales'

//use to track entry point to new sale form page
let referrer = ''
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
  if (!req.query.page) {
    req.query.page = 1
  }
  referrer = req.get('Referrer')
  let pageNumber = Number(req.query.page)
  let skipAmount = 20 * (pageNumber - 1)
  Sales.find({},{},{skip: skipAmount, limit:20}).sort({date:-1})
    .then((sales) => {
      res.render('sales/indexSales.ejs', 
      {
        sales, 
        baseURL,
        referrer,
        pageTitle: 'Sales',
        addNew: true,
        pageNumber,
        helper: require('../utils/helper'),
        currentEmployee: req.session.currentEmployee
      })
    })
}

const showSale = (req,res) => {
  referrer = req.get('Referrer')
  Sales.findById(req.params.id)
    .then((sale) => {
      res.render('sales/showSale.ejs', 
      {
        sale, 
        baseURL,
        referrer,
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
  referrer = req.get('Referrer')
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
          referrer,
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
          res.redirect(referrer)
        })
    })
}
/*===============================================
EDIT SALE
================================================*/
const editSaleForm = (req, res) => {
  referrer = req.get('Referrer')
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
              saleDate: sale.date.toLocaleDateString('en-CA'),
              sale, 
              customers,
              employees,
              baseURL,
              referrer,
              pageTitle: 'Edit Sale',
              addNew: false,
              currentEmployee: req.session.currentEmployee
            })
          })
        })
      })
  }

  const editSale = (req, res) => {
    let sale = req.body
    let originalSale = {}
    let originalCustomerID
    let originalEmployeeID
    let updatedSale = {}
    Promise.all([
      Sales.findById(req.params.id)
      .then((res) => {
        originalSale = res
        originalCustomerID = res.customer.id
        originalEmployeeID = res.employee.id
      }),
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
        Promise.all([
          Customers.findByIdAndUpdate(originalCustomerID,{$pull: {sales: originalSale.id}}),
          Employees.findByIdAndUpdate(originalEmployeeID,{$pull: {sales: originalSale.id}}),
          Sales.findByIdAndUpdate(req.params.id, {$set: sale}, {new:true})
          .then((res) => {
           updatedSale = res
          })
        ]).then(() => {
          Employees.findByIdAndUpdate(updatedSale.employee.id, {$push: {sales: updatedSale.id}})
          .then((employee) => {})
          Customers.findByIdAndUpdate(updatedSale.customer.id, {$push: {sales: updatedSale.id}})
          .then((customer) => {})
          res.redirect(referrer)
        })
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
    res.redirect("/sales")
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