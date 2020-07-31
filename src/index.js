require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const cardRouter = require('./api/cardRouter.js');
const authRouter = require('./api/authenticationRouter.js');
const errorHandling = require('./errorHandlers/errorHandling.js');
const sessionOptions = require('./session/sessionOptions.js');
require('./passport/passport.js');

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use('/api', cardRouter);

app.use(errorHandling.dbErorr);
app.use(errorHandling.notFound);

// eslint-disable-next-line no-undef
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});