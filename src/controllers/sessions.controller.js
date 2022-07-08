const Users = require('../models/user.model')

const baseURL = '/login'

/*===============================================
LOGIN
================================================*/
const loginForm = (req,res) => {
  res.render('sessions/login.ejs', {baseURL})
}

const login = (req,res) => {
  //req.session.currentUser = 'placeholder user'
  console.log(req.session)
  res.redirect('/users')
}


module.exports = {
  loginForm,
  login
}