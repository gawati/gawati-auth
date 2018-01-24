const passport = require('passport');

exports.login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.sendStatus(401); }
    console.log('authenticated');
    res.send(user);
  })(req, res, next);
};