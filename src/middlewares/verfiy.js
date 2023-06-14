import jwt from 'jsonwebtoken';
import { NoAuthorization } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

export const verify = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			jwt.verify(token, process.env.JWT_SEC, (err, user) => {
				if (err) throw new TransactionError(NoAuthorization);
				req.user = user;
				next();
			});
		} else {
			throw new TransactionError(NoAuthorization);
		}
	} catch (err) {
		next(err);
	}
};
