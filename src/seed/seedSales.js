require('dotenv').config()

const mongoose = require('mongoose')
const Customers = require('../models/customer.model')
const Employees = require('../models/employee.model')
const Sales = require('../models/sale.model')

const dbURL = process.env.MONGODB_URL

//random date function
const randomDate = (date1, date2) => {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || '01-01-1970'
  var date2 = date2 || new Date()
  date1 = new Date(date1).getTime()
  date2 = new Date(date2).getTime()
  if( date1>date2){
      return new Date(randomValueBetween(date2,date1))   
  } else{
      return new Date(randomValueBetween(date1, date2))  
  }
}

//random amount function
const randomAmount = () => {
  return Math.ceil(Math.random() * 20000)
}

// mongoose.connect(dbURL, () => {
// Customers.find()
//   .then((response) => {
//   console.log(response)
//   })
// })

const generateSales = (num) => {
  mongoose.connect(dbURL, () => {
    for (let i = 0; i < num; i++) {
      console.log(i)
      let sale = {}
      let randomCustomer = {}
      let randomEmployee = {}
      Promise.all([
      Customers.aggregate([{$sample: {size: 1}}])
        .then((response) => {
          randomCustomer = response[0]
        }),
      Employees.aggregate([{$sample: {size: 1}}])
        .then((response) => {
          randomEmployee = response[0]
        })
      ]).then(() => {
        sale.date = randomDate('2020/07/01', '2022/06/01'),
        sale.customer = {}
        sale['customer'].name = randomCustomer.name,
        sale['customer'].id = randomCustomer._id,
        sale.employee = {}
        sale['employee'].name = randomEmployee.firstName + ' ' + randomEmployee.lastName,
        sale['employee'].id = randomEmployee._id,
        sale.amount = randomAmount(),
        sale.description = "Lorem Ipsum"
        Sales.create(sale)
          .then((newSale) => {
            Employees.findByIdAndUpdate(newSale.employee.id, {$push: {sales: newSale.id}})
            .then((employee) => {})
            Customers.findByIdAndUpdate(newSale.customer.id, {$push: {sales: newSale.id}})
            .then((customer) => {})
          })
      })
    }
    console.log('seed complete')
  })
}

generateSales(20)


// mongoose.connect(dbURL, () => {
//   for (let i = 0; i < 10; i++) {
//     let sale = generateSale()
//     console.log(sale)
//     Sales.create(sale)
//       .then(() => {})
//   }
// })



