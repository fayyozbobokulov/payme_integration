import productModel from '../models/order.js';

class ProductRepo {
	constructor(model) {
		this.model = model;
	}

	async getById(productId) {
		return this.model.findOne({ orderId: productId });
	}
}

export default new ProductRepo(productModel);
