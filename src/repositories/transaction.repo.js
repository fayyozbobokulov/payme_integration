import transactionModel from '../models/transaction.model.js';

class TransactionRepo {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		return await this.model.create(data);
	}

	async getById(transactionId) {
		return await this.model.findOne({ id: transactionId });
	}

	async getByFilter(filter) {
		return await this.model.findOne(filter);
	}

	async updateById(transactionId, update) {
		return await this.model.findByIdAndUpdate(transactionId, update);
	}
}

export default new TransactionRepo(transactionModel);
