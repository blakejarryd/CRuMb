const Employees = require('../models/employee.model')

const baseURL = '/employees'

/*===============================================
GET Employees
================================================*/
const getEmployeesJSON = (req,res) => {
  Employees.find()
    .then((employees) => {
      res.send(employees)
    })
}

const getEmployees = (req,res) => {
  Employees.find()
    .then((employees) => {
      res.render('employees/indexEmployees.ejs', 
      {
        employees, 
        baseURL,
        pageTitle: 'Employees',
        addNew: true,
        currentEmployee: req.session.currentEmployee
      })
    })
}

const showEmployee = (req,res) => {
  Employees.findById(req.params.id)
    .then((employee) => {
      res.render('employees/showEmployee.ejs', 
      {
        employee, 
        baseURL,
        pageTitle: 'Employee',
        addNew: false,
        currentEmployee: req.session.currentEmployee
      })
    })
}

/*===============================================
CREATE EMPLOYEE
================================================*/
const newEmployeeForm = (req, res) => {
  res.render('employees/newEmployee.ejs', 
  {
    baseURL,
    pageTitle: 'Create Employee',
    addNew: false,
    currentEmployee: req.session.currentEmployee
  })
}

const newEmployee = (req, res) => {
  Employees.create(req.body)
    .then((newEmployee) => {
      res.redirect(baseURL)
    })
}

/*===============================================
EDIT USER
================================================*/
const editEmployeeForm = (req, res) => {
  Employees.findById(req.params.id)
    .then((employee) => {
      res.render(('Employees/editEmployee.ejs'), 
      {
        employee, 
        baseURL,
        pageTitle: 'Edit Employee',
        addNew: false,
        currentEmployee: req.session.currentEmployee
      })
    })
}

const editEmployee = (req, res) => {
  Employees.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then((updatedEmployee) => {
      res.redirect(baseURL + '/' + req.params.id)
    })
}

/*===============================================
DELETE USER
================================================*/
const deleteEmployee = (req, res) => {
  Employees.findByIdAndDelete(req.params.id) 
    .then((deletedEmployee) => {
    console.log(deletedEmployee)
    res.redirect(baseURL)
    })
}


module.exports = {
  getEmployeesJSON,
  getEmployees,
  showEmployee,
  newEmployeeForm,
  newEmployee,
  editEmployeeForm,
  editEmployee,
  deleteEmployee,
}