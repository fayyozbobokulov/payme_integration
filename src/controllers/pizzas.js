import Pizza from '../models/pizzas.js';

// Get Method
export const getPizza = async (req, res) => {
	try {
		const pizza = await Pizza.find();
		!pizza && res.status(500).json({ message: 'not found', data: false });
		res.status(200).json({
			message: 'successfully get is Pizza',
			data: pizza,
		});
	} catch (error) {
		return res.json(error.message);
	}
};

// Get Method By Id
export const getByIdPizza = async (req, res) => {
	try {
		const food = await Pizza.findById(req.params.id);
		!food && res.status(500).json({ message: 'not found', data: false });
		res.status(200).json({ message: 'successfully get are food', data: food });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Post Method
export const postPizza = async (req, res) => {
	try {
		const food = new Pizza({ img: req.file.filename, ...req.body });
		await food.save();
		res.status(200).json({ message: 'successfully updatedAt', data: food });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Put Method
export const updatePizza = async (req, res) => {
	try {
		const newPizza = await Pizza.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					img: req.file.filename,
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		!newPizza &&
			res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newPizza });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedPizza = async (req, res) => {
	try {
		await Pizza.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// file upload
export const fileUploadPizza = async (req, res) => {
	try {
		const newPizza = await Pizza.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		!newPizza &&
			res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newPizza });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
