require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const cardRouter = require('./api/cardRouter.js');
const authRouter = require('./api/authenticationRouter.js');
const errorHandling = require('./errorHandlers/errorHandling.js');
const sessionOptions = require('./session/sessionOptions.js');

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());

app.use(session(sessionOptions));


// routes
app.use('/', authRouter);
app.use('/api', cardRouter);

// error handling middleware
app.use(errorHandling.dbErorr);
app.use(errorHandling.notFound);

// eslint-disable-next-line no-undef
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});