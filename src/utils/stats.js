const totalSales = (sales) => {
  total = 0
  for (sale of sales) {
   total += sale.amount
  }
  return total
}

const largestSale = (sales) => {
  let largest = {
    amount: 0,
    date: '',
    id: '',
  }
  for (sale of sales) {
    if (sale.amount > largest.amount) {
      largest.amount = sale.amount
      largest.date = sale.date
      largest.id = sale._id
    }
   }
   return largest
}

const averageSale = (sales) => {
  total = 0
  for (sale of sales) {
   total += sale.amount
  }
  return (total/sales.length).toFixed(2)
}


const topSalePerson = (sales) => {
  let employees = {}
  for (sale of sales) {
    let employeeFound = 0
    for (employee in employees) {
      if (sale.employee.id == employee) {
        employees[sale.employee.id].amount += sale.amount
        employees[sale.employee.id].saleCount++
        employeeFound = 1
      }
    } 
    if (employeeFound === 0) {
      employees[sale.employee.id] = {name: sale.employee.name, saleCount: 1, amount: sale.amount}
    }
  }
  let topAmount = 0
  let topEmployee = {} 
  for (employee in employees) {
    if(employees[employee]['amount'] > topAmount) {
      topAmount = employees[employee]['amount']
      topEmployee = employees[employee]
      topEmployee.id = employee
    }
  }
  return topEmployee
}





module.exports = {
  totalSales,
  largestSale,
  averageSale,
  topSalePerson
}