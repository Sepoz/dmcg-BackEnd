const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connection =  require('../models/schemas.js');
const User = connection.models.user;
const passCrypto = require('../passwordUtils/passCrypto.js');

const setStrategy = new LocalStrategy((username, password, done) => {
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}

		const isValid = passCrypto.validatePassword(password, user.hash, user.salt);

		if (!isValid) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
		
	});
}
);

passport.use(setStrategy);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});