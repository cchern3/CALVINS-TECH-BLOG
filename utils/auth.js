const withAuth = (req, res, next) => {
  // if not logged in, the user will be redirected to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // if logged in, user will be able to have access to the home page and dashboard
    // user is authenticated through next()
    next();
  }
};

module.exports = withAuth;