const session = require('express-session');
const dbConnection = require('../models/cardSchema.js');
const MongoStore = require('connect-mongo')(session);

const sessionStore = new MongoStore({
	mongooseConnection: dbConnection,
	collection: 'sessions',
});

const sessionOptions = {
	// eslint-disable-next-line no-undef
	secret: process.env.SESSION_SECRET,
	resave: false,
	store: sessionStore,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
	},
};

module.exports = sessionOptions;