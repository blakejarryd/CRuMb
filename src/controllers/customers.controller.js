const Customers = require('../models/customer.model')
const Sales = require('../models/sale.model')

const baseURL = '/customers'

/*===============================================
GET Customers
================================================*/
const getCustomersJSON = (req,res) => {
  Customers.find()
    .then((customers) => {
      res.send(customers)
    })
}

const getCustomers = (req,res) => {
  Customers.find()
    .then((customers) => {
      res.render('customers/indexCustomers.ejs', 
      {
        customers, 
        baseURL,
        pageTitle: 'Customers',
        addNew: true,
        currentEmployee: req.session.currentEmployee
      })
    })
}

const showCustomer = (req,res) => {
  let customer = {}
  let sales = {}
  Customers.findById(req.params.id)
    .then((response) => {
    customer = response
    Sales.find({_id: {$in: customer.sales}}).sort({date:-1})
      .then((response) => {
      sales = response
      res.render('customers/showCustomer.ejs', 
      {
        customer, 
        sales,
        baseURL,
        pageTitle: `${customer.name}`,
        addNew: false,
        helper: require('../utils/helper'),
        currentEmployee: req.session.currentEmployee
      })
    })
  })
}

/*===============================================
CREATE Customer
================================================*/
const newCustomerForm = (req, res) => {
  res.render('customers/newCustomer.ejs', 
  {
    baseURL,
    pageTitle: 'New Customer',
    addNew: false,
    currentEmployee: req.session.currentEmployee
  })
}

const newCustomer = (req, res) => {
  Customers.create(req.body)
    .then((newCustomer) => {
      res.redirect(baseURL)
    })
}

/*===============================================
EDIT USER
================================================*/
const editCustomerForm = (req, res) => {
  Customers.findById(req.params.id)
    .then((customer) => {
      res.render(('customers/editCustomer.ejs'), 
      {
        customer, 
        baseURL,
        pageTitle: 'Edit Customer',
        addNew: false,
        currentEmployee: req.session.currentEmployee
      })
    })
}

const editCustomer = (req, res) => {
  Customers.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then((updatedCustomer) => {
      res.redirect(baseURL + '/' + req.params.id)
    })
}

/*===============================================
DELETE USER
================================================*/
const deleteCustomer = (req, res) => {
  Customers.findByIdAndDelete(req.params.id) 
    .then((deletedCustomer) => {
    res.redirect(baseURL)
    })
}


module.exports = {
  getCustomersJSON,
  getCustomers,
  showCustomer,
  newCustomerForm,
  newCustomer,
  editCustomerForm,
  editCustomer,
  deleteCustomer,
}