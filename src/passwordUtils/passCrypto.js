const crypto = require('crypto');

function generatePassword(password) {
	const salt = crypto.randomBytes(32).toString('hex');
	const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

	return {
		salt: salt,
		hash: genHash,
	};
}

function validatePassword(password, hash, salt) {
	const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
	return hash === verifyHash;
}

module.exports = {
	generatePassword,
	validatePassword,
};