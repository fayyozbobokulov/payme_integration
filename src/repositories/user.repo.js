import userModel from '../models/users.js';

class UserRepo {
	constructor(model) {
		this.model = model;
	}

	async getById(userId) {
		return this.model.findById(userId);
	}
}

export default new UserRepo(userModel);
