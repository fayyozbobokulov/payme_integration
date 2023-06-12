import productModel from '../models/order.js';

class ProductRepo {
	constructor(model) {
		this.model = model;
	}

	async getById(productId) {
		return this.model.findById(productId);
	}
}

export default new ProductRepo(productModel);
