// user middleware

exports.user = function (req, res, next, id) {
  return db.User.find({where: {id: id}}).then(function (user) {
    if (!user) {
      return next(new Error('Failed to load User ' + id));
    }
    req.profile = user;
    next();
  }).catch(function (err) {
    next(err);
  });
};
