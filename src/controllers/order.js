import Order from '../models/order.js';
import { v4 } from 'uuid';

export const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			userId: req.user._id,
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
				foods: [req.body],
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
					foods: req.body,
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
		}
		return res
			.status(200)
			.json({ message: 'Successfully updated', data: newOrder });
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: false,
		});
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
