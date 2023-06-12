import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

export const Register = async (req, res) => {
	try {
		const currentUser = await User.findOne({
			email: req.body.email,
		});
		if (!currentUser) {
			const user = new User({ userId: v4(), ...req.body });
			const newuser = await user.save();
			return res
				.status(200)
				.json({ message: 'User addet Sucsessfuly', data: newuser });
		} else {
			return res.json({
				message: 'This email is olready exist',
			});
		}
	} catch (error) {
		res.status(401).json({ error: error.message });
		console.log(error);
		return;
	}
};

export const Login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		if (!user)
			return res
				.status(401)
				.json({ data: false, message: 'Wrong email or password' });

		if (user.password !== req.body.password)
			return res.status(401).json('Wrong Password');

		const accessToken = jwt.sign(
			{
				_id: user._id,
				password: user.password,
			},
			process.env.JWT_SEC,
			{ expiresIn: '3d' }
		);
		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(500).json(err.message);
		return;
	}
};

// export const Logout = async (req, res) => {
// 	try {
// 		await User.updateOne(
// 			{ username: req.user.username },
// 			{
// 				$set: {
// 					acsesstoken: '',
// 				},
// 			}
// 		);
// 		res.status(200).json({ message: 'OK' });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// };

// Put Method
export const updateUser = async (req, res) => {
	try {
		const newUser = await User.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		if (!newUser)
			return res.status(500).json({
				message: 'Is not a User',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newUser });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

export const getByIdUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(500).json({ message: 'not found', data: false });
		res.status(200).json({ message: 'successfully get are user', data: user });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
