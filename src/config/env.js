import { config } from 'dotenv';
config();

module.exports = {
	PAYME_MERCHANT_KEY: process.env.PAYME_MERCHANT_KEY,
};
