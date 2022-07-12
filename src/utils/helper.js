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

const dateSort = (a, b) => {
  return new Date(b.date) - new Date(a.date)
}

module.exports = {
  isLoggedIn,
  stringToCurrency,
  dateSort
}