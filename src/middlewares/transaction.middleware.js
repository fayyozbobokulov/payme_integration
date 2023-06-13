import base64 from 'base-64';

import { PaymeError } from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

const PAYME_MERCHANT_KEY = process.env.PAYME_MERCHANT_KEY;

export const paymeCheckToken = (req, res, next) => {
	try {
		const { id } = req.body;
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) throw new TransactionError(PaymeError.InvalidAuthorization, id);

		const data = base64.decode(token).split(':')[1].toString();
		console.log(data);

		if (data !== 'RxKVB4NaT4388mx0RnB?G6VZCq?gm4rZWWUE') {
			throw new TransactionError(PaymeError.InvalidAuthorization, id);
		}

		next();
	} catch (err) {
		next(err);
	}
};
