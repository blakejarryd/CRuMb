const isLoggedIn = (req, res, next) => {
  if (!req.session.currentEmployee) {
    return res.redirect('/login')
  }
  next()
}

const stringToCurrency = (string) => {
  let dollarFormat = Intl.NumberFormat('en-US')
  return '$'+dollarFormat.format(string)
}

module.exports = {
  isLoggedIn,
  stringToCurrency
}