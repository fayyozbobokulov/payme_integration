import transactionModel from '../models/transaction.model.js';

class TransactionRepo {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		await this.model.create(data);
	}

	async getById(transactionId) {
		return this.model.findById(transactionId);
	}

	async getByFilter(filter) {
		return this.model.findOne(filter);
	}

	async updateById(transactionId, update) {
		return this.model.findByIdAndUpdate(transactionId, update);
	}
}

export default new TransactionRepo(transactionModel);
