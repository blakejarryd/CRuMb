# CRuMb

## What is CRuMb?

A Customer Relationship Management (CRM) application that understands the importance of data in managing and driving sales in your business.

The app can be accessed with demo data here https://crumbcrm.herokuapp.com/

## Technologies Used
- Node JS 
- Express
- Mongo DB
- EJS 
- Bootstrap

## Data Structure
The application is built around three core data models
- Customers
- Employees
- Sales

A sale is related to the customer for which the sale was to. As well as the employee that made the sale.

This relational data is then used to show analytical metrics on both the customer and employee details page based on the sales records they are linked too. 

## Routes
The application is built following a RESTful API structure.

**Root**
| HTTP Method | Route | Description |
| ----------- | ----- | ----------- |
| GET | / | Home Page |

**Session**
| HTTP Method | Route | Description |
| ----------- | ----- | ----------- |
| GET | /login | Login page |
| POST | /login | Submit login |
| DELETE | /logout | Delete session |

**Customers**
| HTTP Method | Route | Description |
| ----------- | ----- | ----------- |
| GET | /customers | Users index page |
| GET | /customers/new | Create new user page |
| POST | /customers | Create new user |
| GET | /customers/:id | User details page |
| GET | /customers/:id/edit | Edit user page |
| PUT | /customers/:id | Edit user |
| DELETE | /customers/:id | Delete user |

**Employees**
| HTTP Method | Route | Description |
| ----------- | ----- | ----------- |
| GET | /employees | Employees index page |
| GET | /employees/new | Create new employee page |
| POST | /employees | Create new employee |
| GET | /employees/:id | Employee details page |
| GET | /employees/:id/edit | Edit employee page |
| PUT | /employees/:id | Edit employee |
| DELETE | /employees/:id | Delete employee |

**Sales**
| HTTP Method | Route | Description |
| ----------- | ----- | ----------- |
| GET | /sales | Sales index page |
| GET | /sales/new | Create new sale page |
| POST | /sales | Create new sale |
| GET | /sales/:id | Sale details page |
| GET | /sales/:id/edit | Edit sale page |
| PUT | /sales/:id | Edit sale |
| DELETE | /sales/:id | Delete sale |

## Notable Features

1. The new sales form ("/sales/new") uses smart defaults depending on the point of entry. 
- Enter from a customer details page ("/customer/:id") 
  - Customer dropdown pre-populates with relevant customer
  - Sales person dropdown populates with the logged in user
  - Date defaults to current date
- Enter from a employee details page ("employee/:id")
  - Sales person dropdown pre-populates with relevant employee
  - Date defaults to current date
- Enter from the sales index page ("/sales")
  - Date defaults to current date

2. The sales index page ("/sales") is paginated. Only 20 records are loaded from the database at a time. Sales are sorted based on sale date descending by default.

3. The aggregated sales statistics on the employee and customer details pages. Total sales, average sale, largest sale etc. 

4. Data seed script generates any number of sales supplied to the generateSales() function and randomly assigns a customer and sales person from the database to each sale. Along with a random sale date and amount. 





