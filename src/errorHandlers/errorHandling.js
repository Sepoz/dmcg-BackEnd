function notFound(req, res) {
	res.status(404).send({ error: '404 not found'});
}

function dbErorr(err, req, res, next) {
	if (err) {
		const errObj = new Error('Database Erorr');
		res.send({
			erorr: errObj,
		});
	}
	next();
} 

module.exports = {
	notFound,
	dbErorr,
};