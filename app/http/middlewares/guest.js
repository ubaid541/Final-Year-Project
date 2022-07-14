// check if seller already logged in

function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/admin");
}

module.exports = guest;
