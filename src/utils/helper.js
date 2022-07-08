const isLoggedIn = (req, res, next) => {
  if (!req.session.currentEmployee) {
    return res.redirect('/login')
  }
  next()
}

module.exports = {
  isLoggedIn
}