const { Router } = require('express');
const dbConnection = require('../models/schemas.js');
const CardModel = dbConnection.models.card;

const router = Router();

router.get('/get_cards', async (req, res, next) => {
	try {
		const cards = await CardModel.find();
		res.json(cards);
	} catch (err) {
		next(err);
	}
});

// only fo posting new cards into the db
router.post('/post_cards', async (req, res, next) => {
	try {
		const newCard = new CardModel(req.body);
		const createCard = await newCard.save();
		res.status(201).send(createCard);
	} catch (err) {
		next(err);
	}
});

module.exports = router;