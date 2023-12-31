import Salad from '../models/salads.js';

// Get Method
export const getSalad = async (req, res) => {
	try {
		const salad = await Salad.find();
		!salad && res.status(500).json({ message: 'not found', data: false });
		res.status(200).json({
			message: 'successfully get are Salad',
			data: salad,
		});
	} catch (error) {
		return res.json(error.message);
	}
};

// Get Method By Id
export const getByIdSalad = async (req, res) => {
	try {
		const salad = await Salad.findById(req.params.id);
		!salad && res.status(500).json({ message: 'not found', data: false });
		res
			.status(200)
			.json({ message: 'successfully get are salad', data: salad });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Post Method
export const postSalad = async (req, res) => {
	try {
		const salad = new Salad({ img: req.file.filename, ...req.body });
		await salad.save();
		res.status(200).json({ message: 'successfully updatedAt', data: salad });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Put Method
export const updateSalad = async (req, res) => {
	try {
		const newSalad = await Salad.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					img: req.file.filename,
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		!newSalad &&
			res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newSalad });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedSalad = async (req, res) => {
	try {
		await Salad.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
