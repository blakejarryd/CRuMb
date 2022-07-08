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
      res.render('users/indexUsers.ejs', 
      {
        users, 
        baseURL,
        currentUser: req.session.currentUser
      })
    })
}

const showUser = (req,res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.render('users/showUser.ejs', 
      {
        user, 
        baseURL,
        currentUser: req.session.currentUser
      })
    })
}

/*===============================================
CREATE USERS
================================================*/
const newUserForm = (req, res) => {
  res.render('users/newUser.ejs', 
  {
    baseURL,
    currentUser: req.session.currentUser
  })
}

const newUser = (req, res) => {
  Users.create(req.body)
    .then((newUser) => {
      res.redirect(baseURL)
    })
}

/*===============================================
EDIT USER
================================================*/
const editUserForm = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.render(('users/editUser.ejs'), 
      {
        user, 
        baseURL,
        currentUser: req.session.currentUser
      })
    })
}

const editUser = (req, res) => {
  Users.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then((updatedUser) => {
      console.log(updatedUser)
      res.redirect(baseURL + '/' + req.params.id)
    })
}

/*===============================================
DELETE USER
================================================*/
const deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.id) 
    .then((deletedUser) => {
    console.log(deletedUser)
    res.redirect(baseURL)
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
  deleteUser,
}