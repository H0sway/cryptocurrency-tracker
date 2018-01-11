const passport = require('passport');
const User = require('../../models/user');

module.exports = () => {
  // Get info from the "user" object
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  // Turn that info back into a "user" object
  passport.deserializeUser((username, done) => {
    User.findByUserName(username)
      .then(user => {
        done(null, user);
      }).catch(err => {
        done(err, null);
      });
  });
};
