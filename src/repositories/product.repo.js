import productModel from '../models/onlineOrder.js';

class ProductRepo {
	constructor(model) {
		this.model = model;
	}

	async getById(productId) {
		return this.model.findOne({ orderId: productId });
	}

	async getByUserId(userID) {
		return this.model.findOne({ userId: userID });
	}
}

export default new ProductRepo(productModel);
