import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		foods: [],
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		amount: { type: Number, required: true },
		orderId: { type: String, default: 'soskcsc' },
		location: { type: String, required: true, default: '2222.222.22.2222.222' },
		status: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default model('Cash', orderSchema);
