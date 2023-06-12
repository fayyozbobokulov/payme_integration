import { Schema, model } from 'mongoose';

const drinksSchema = new Schema(
	{
		title: { type: String, required: true },
		liter: { type: Number, required: true },
		img: { type: String, required: true },
		price: { type: Number, required: true },
		selection: { type: Boolean, default: true },
		objId: { type: String },
	},
	{ timestamps: true }
);

export default model('Drinks', drinksSchema);
