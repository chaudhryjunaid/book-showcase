// auth middleware

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({message: 'User is not authorized'});
  }
  next();
};
