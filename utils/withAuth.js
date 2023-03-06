//this is currently not being used, may implement in future.
const withAuth = (req, res, next) => {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;