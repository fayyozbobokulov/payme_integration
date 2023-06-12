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
		orderId: { type: String, default: "soskcsc"},
	},
	{ timestamps: true }
);

export default model('Order', orderSchema);
