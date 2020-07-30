const { Router } = require('express');
const dbConnection = require('../models/cardSchema.js');
const User = dbConnection.models.user;

const router = Router();

router.post('/registration', async (req, res, next) => {
	try {
		const newUser = new User(req.body);
		const createUser = await newUser.save();
		res.status(201).send(createUser);
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		res.send('hi baby');
	} catch (err) {
		next(err);
	}
});

module.exports = router;