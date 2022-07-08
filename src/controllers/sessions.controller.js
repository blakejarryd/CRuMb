const Users = require('../models/user.model')

const baseURL = '/login'

/*===============================================
LOGIN
================================================*/
const loginForm = (req,res) => {
  res.render('sessions/login.ejs', {baseURL})
}

const login = (req,res) => {
  Users.findOne({username: req.body.username})
  .then((user) => {
    if (!user) {
      console.log('username is not found')
      // req.flash('error', 'User not found')
      return res.redirect('/login')
    }
    //const correctPassword = bcrypt.compareSync(req.body.password, user.password)
    const correctPassword = (req.body.password === 'password')
    if (!correctPassword) {
      console.log('incorrect password')
      res.redirect('/login')
    } else {
      // username is found and password matches
      req.session.currentUser = user
      res.redirect('/users')
    }  
  })
}

const logout = ((req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})


module.exports = {
  loginForm,
  login,
  logout,
}