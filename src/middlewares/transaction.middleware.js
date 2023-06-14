import base64 from 'base-64';

import myKey from '../config/env.js';
import { PaymeError } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

const PAYME_MERCHANT_KEY = myKey.PAYME_MERCHANT_KEY;

export const paymeCheckToken = (req, res, next) => {
	try {
		const { id } = req.body;
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) throw new TransactionError(PaymeError.InvalidAuthorization, id);

		const data = base64.decode(token);

		if (!data.includes(PAYME_MERCHANT_KEY)) {
			throw new TransactionError(PaymeError.InvalidAuthorization, id);
		}

		next();
	} catch (err) {
		next(err);
	}
};
