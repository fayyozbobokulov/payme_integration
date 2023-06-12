import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		img: { type: String },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		userId: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model('userModel', usersSchema);
