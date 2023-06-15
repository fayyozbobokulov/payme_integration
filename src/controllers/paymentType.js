import Order from '../models/order.js';
import Cash from '../models/cashOrder.js';
import Online from '../models/onlineOrder.js';
import User from '../models/users.js';
import myKey from '../config/env.js';

// Post Method
export const postPaymentType = async (req, res) => {
	try {
		const order = await Order.findOne({ userId: req.user._id });
		console.log(order);
		if (order) {
			if (req.body.type === 'cash') {
				const cashOrder = new Cash({
					foods: order.foods,
					userId: order.userId,
					amount: order.amount,
					orderId: order.orderId,
					location: req.body.location,
				});
				await cashOrder.save();
				await Order.findByIdAndDelete(order._id);
				return res
					.status(200)
					.json({ message: 'successfully send to cash order' });
			}
			if (req.body.type === 'online') {
				const onlineOrder = new Online({
					foods: order.foods,
					userId: order.userId,
					amount: order.amount,
					orderId: order.orderId,
					location: req.body.location,
				});
				await onlineOrder.save();
				await Order.findByIdAndDelete(order._id);
				const user = await User.findById(req.user._id);
				return res.status(200).json({
					message: 'Data to be sent to PAYME',
					data: {
						amount: onlineOrder.amount,
						user_id: user.userId,
						order_id: onlineOrder.orderId,
						merId: myKey.PAYME_MERCHANT_ID,
					},
				});
			}
		}
		return res.status(401).json({ message: 'Order not found' });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
		return;
	}
};
