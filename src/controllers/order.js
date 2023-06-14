import Order from '../models/order.js';
import User from '../models/users.js';
import { v4 } from 'uuid';
import { config } from 'dotenv';
config();

export const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			userId: req.user._id,
			sendToPayment: false,
		});
		if (!order) {
			return res.status(500).json({ message: 'Order is impty' });
		}
		return res
			.status(200)
			.json({ message: 'successfully get All is data', data: order.foods });
	} catch (e) {
		return res.status(500).json({
			message: 'Order is impty',
			data: false,
		});
	}
};

export const addOrder = async (req, res) => {
	try {
		const order = await Order.findOne({ userId: req.user._id });
		if (!order) {
			const ord = new Order({
				foods: [{ img: req.file.filename, ...req.body }],
				userId: req.user._id.toString(),
				amount: req.body.price,
				orderId: v4(),
			});
			await ord.save();
			return res
				.status(200)
				.json({ message: 'successfully Created', data: ord });
		}
		if (order.sendToPayment) {
			const ord = new Order({
				foods: [{ img: req.file.filename, ...req.body }],
				userId: req.user._id.toString(),
				amount: req.body.price,
				orderId: v4(),
			});
			await ord.save();
			return res
				.status(200)
				.json({ message: 'successfully Created', data: ord });
		}
		const newOrder = await Order.findByIdAndUpdate(
			{ _id: order._id },
			{
				$push: {
					foods: { img: req.file.filename, ...req.body },
				},
				$inc: { amount: req.body.price },
			},
			{ new: true }
		);
		if (!newOrder) {
			return res.status(500).json({
				message: 'Order not found',
				data: false,
			});
		} else {
			res.status(200).json({ message: 'Successfully updated', data: newOrder });
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: false,
		});
	}
};

export const addLocation = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const order = await Order.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: { location: req.body.location, sendToPayment: true },
			},
			{ new: true, useFindAndModify: false }
		);
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		res.status(200).json({
			message: 'Data to be sent to PAYME',
			data: {
				amount: order.amount,
				user_id: user.userId,
				order_id: order.orderId,
				merId: process.env.PAYME_MERCHANT_ID,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const deleteOrder = async (req, res, next) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (err) {
		next(err);
	}
};
