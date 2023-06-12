import { Schema, model } from 'mongoose';

const saladsSchema = new Schema(
	{
		title: { type: String, required: true },
		amount: { type: String, default: 'hajm' },
		img: { type: String, required: true },
		price: { type: Number, required: true },
		selection: { type: Boolean, default: true },
		objId: { type: String },
	},
	{ timestamps: true }
);

export default model('Salad', saladsSchema);
