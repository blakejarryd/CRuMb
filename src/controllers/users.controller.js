const Users = require('../models/user.model')

const baseURL = '/users'

/*===============================================
GET USERS
================================================*/
const getUsersJSON = (req,res) => {
  Users.find()
    .then((users) => {
      res.send(users)
    })
}

const getUsers = (req,res) => {
  Users.find()
    .then((users) => {
      res.render('users/indexUsers.ejs', {users, baseURL})
    })
}

const showUser = (req,res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.render('users/showUser.ejs', {user, baseURL})
    })
}

/*===============================================
CREATE USERS
================================================*/
const newUserForm = (req, res) => {
  res.render(('users/newUser.ejs'), {baseUrl})
}

const newUser = (req, res) => {
  console.log(req.body)
  Users.create(req.body)
    .then((newUser) => {
      console.log(`${newUser.username} has been created`)
      res.redirect(baseURL)
  })
}

/*===============================================
EDIT USERS
================================================*/
const editUserForm = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.render(('users/editUser.ejs'), {user, baseURL})
    })
}

const editUser = (req, res) => {
  Users.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then((updatedUser) => {
      console.log(updatedUser)
      res.redirect(baseURL + '/' + req.params.id)
  })
}

module.exports = {
  getUsersJSON,
  getUsers,
  showUser,
  newUserForm,
  newUser,
  editUserForm,
  editUser,
}