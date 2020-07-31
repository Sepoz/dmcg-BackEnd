const { Router } = require('express');
const passport = require('passport');

const passCrypto = require('../passwordUtils/passCrypto.js');
const dbConnection = require('../models/schemas.js');
const User = dbConnection.models.user;

const router = Router();

router.post('/registration', async (req, res, next) => {
	try {
		const verifyUsername = await User.findOne({username: req.body.username});

		if(verifyUsername != null) {
			return res.send({processStatus: 'username already taken'});
		}
		const saltHash = passCrypto.generatePassword(req.body.password);
	
		const salt = saltHash.salt;
		const hash = saltHash.hash;
	
		const newUser = new User({
			username: req.body.username,
			hash: hash,
			salt: salt,
		});
		await newUser.save();

		res.send({processStatus: 'registration completed'});
	} catch (err) {
		next(err);
	}
});

router.post('/login', passport.authenticate('local', {failWithError: true}), (req, res, next) => {
	try {
		res.send({processStatus: 'login completed'});
	} catch (err) {
		res.send({processStatus: 'could not authenticate'});
		next(err);
	}
});

module.exports = router;