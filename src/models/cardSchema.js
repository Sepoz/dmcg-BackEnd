const mongoose = require('mongoose');
const { Schema } = mongoose;

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connectionErr = (err) => {
	if(err) console.log(err);
};
// eslint-disable-next-line no-undef
const dbConnection = mongoose.createConnection(process.env.DB_URL, dbOptions, connectionErr); 

const cardSchema = new Schema({
	cardName: {
		type: String,
	},
	cardAlignment: {
		type: String,
	},
	cardDescription: {
		type: String,
	},
	cardAttack: {
		type: Number,
	},
	cardDefence: {
		type: Number,
	},
	cardNumber: {
		type: Number,
	},
});

const userSchema = new Schema({
	userName: {
		type: String,
	},
	hash: {
		type: String,
	},
	salt: {
		type: String,
	},
});

dbConnection.model('card', cardSchema);
dbConnection.model('user', userSchema);

module.exports = dbConnection;