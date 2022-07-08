const Users = require('../models/user.model')

const baseURL = '/login'

/*===============================================
LOGIN
================================================*/
const loginForm = (req,res) => {
  res.render('sessions/login.ejs', {baseURL})
}


module.exports = {
  loginForm
}