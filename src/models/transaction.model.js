const mongoose = require('mongoose');


const { Schema, model } = mongoose;

const transactionSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		product_id: {
			type: String,
			required: true,
		},
		state: {
			type: Number,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		create_time: {
			type: Number,
			default: Date.now(),
		},
		perform_time: {
			type: Number,
			default: 0,
		},
		cancel_time: {
			type: Number,
			default: 0,
		},
		reason: {
			type: Number,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model('transaction', transactionSchema);
