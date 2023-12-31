import transactionRepo from '../repositories/transaction.repo.js';
import userRepo from '../repositories/user.repo.js';
import productRepo from '../repositories/product.repo.js';

import {
	PaymeError,
	PaymeData,
	TransactionState,
} from '../enums/transaction.enum.js';

import TransactionError from '../errors/transaction.error.js';

class TransactionService {
	constructor(repo, userRepo, productRepo) {
		this.repo = repo;
		this.userRepo = userRepo;
		this.productRepo = productRepo;
	}

	timeOut(create_time) {
		if (create_time) {
			setTimeout(() => {
				return false;
			}, 12000);
		}
	}

	async checkPerformTransaction(params, id) {
		const { account, amount } = params;

		const user = await this.userRepo.getById(account.user_id);
		if (!user) {
			throw new TransactionError(PaymeError.UserNotFound, id, PaymeData.UserId);
		}

		const product = await this.productRepo.getById(account.order_id);
		if (!product) {
			throw new TransactionError(
				PaymeError.ProductNotFound,
				id,
				PaymeData.ProductId
			);
		}

		if (amount !== product.amount) {
			throw new TransactionError(PaymeError.InvalidAmount, id);
		}
	}

	async checkTransaction(params, id) {
		const transaction = await this.repo.getById(params.id);
		if (!transaction) {
			throw new TransactionError(PaymeError.TransactionNotFound, id);
		}

		return {
			create_time: transaction.create_time,
			perform_time: transaction.perform_time,
			cancel_time: transaction.cancel_time,
			transaction: transaction.id,
			state: transaction.state,
			reason: transaction.reason,
		};
	}

	async createTransaction(params, id) {
		const { account, time, amount } = params;

		await this.checkPerformTransaction(params, id);

		let transaction = await this.repo.getById(params.id);
		if (transaction) {
			if (transaction.state !== TransactionState.Pending) {
				throw new TransactionError(PaymeError.CantDoOperation, id);
			}

			const currentTime = Date.now();

			const expirationTime =
				(currentTime - transaction.create_time) / 60000 < 12; // 12m

			if (!expirationTime) {
				await this.repo.updateById(params.id, {
					state: TransactionState.PendingCanceled,
					reason: 4,
				});
				throw new TransactionError(PaymeError.CantDoOperation, id);
			}

			return {
				create_time: transaction.create_time,
				transaction: transaction.id,
				state: TransactionState.Pending,
			};
		}

		transaction = await this.repo.getByFilter({
			user_id: account.user_id,
			product_id: account.order_id,
		});
		if (transaction) {
			if (transaction.state === TransactionState.Paid)
				throw new TransactionError(PaymeError.AlreadyDone, id);
			if (transaction.state === TransactionState.Pending)
				throw new TransactionError(PaymeError.Pending, id);
		}

		const newTransaction = await this.repo.create({
			id: params.id,
			state: TransactionState.Pending,
			amount,
			user_id: account.user_id,
			product_id: account.order_id,
			create_time: time,
		});
		return {
			transaction: newTransaction.id,
			state: TransactionState.Pending,
			create_time: newTransaction.create_time,
		};
	}

	async performTransaction(params, id) {
		const currentTime = Date.now();

		const transaction = await this.repo.getById(params.id);
		if (!transaction) {
			throw new TransactionError(PaymeError.TransactionNotFound, id);
		}

		if (transaction.state !== TransactionState.Pending) {
			if (transaction.state !== TransactionState.Paid) {
				throw new TransactionError(PaymeError.CantDoOperation, id);
			}

			return {
				perform_time: transaction.perform_time,
				transaction: transaction.id,
				state: TransactionState.Paid,
			};
		}

		const expirationTime = (currentTime - transaction.create_time) / 60000 < 12; // 12m

		if (!expirationTime) {
			await this.repo.updateById(params.id, {
				state: TransactionState.PendingCanceled,
				reason: 4,
				cancel_time: currentTime,
			});

			throw new TransactionError(PaymeError.CantDoOperation, id);
		}

		const data = await this.repo.updateById(params.id, {
			state: TransactionState.Paid,
			perform_time: currentTime,
		});

		return {
			perform_time: currentTime,
			transaction: data.id,
			state: TransactionState.Paid,
		};
	}

	async cancelTransaction(params, id) {
		const transaction = await this.repo.getById(params.id);
		if (!transaction) {
			throw new TransactionError(PaymeError.TransactionNotFound, id);
		}

		const currentTime = Date.now();

		if (transaction.state === 1) {
			const data = await this.repo.updateById(params.id, {
				state: -Math.abs(transaction.state),
				reason: params.reason,
				cancel_time: currentTime,
			});

			return {
				cancel_time: data.cancel_time || currentTime,
				transaction: data.id,
				state: data.state,
			};
		}
		return {
			cancel_time: data.cancel_time || currentTime,
			transaction: data.id,
			state: data.state,
		};
	}

	async getStatement(params) {
		const { from, to } = params;
		const transaction = await this.repo.getOll();
		if (transaction) {
			const sortTransaction = transaction.sort(
				(a, b) => new Date(b.create_time) - new Date(a.create_time)
			);
			let indexFrom = NaN;
			let indexTo = NaN;
			sortTransaction.forEach((a, ind) => {
				if (a.create_time === from) {
					indexFrom = ind;
				} else if (a.create_time === to) {
					indexTo = ind;
				}
			});
			const arr = sortTransaction.slice(indexFrom, indexTo + 1);
			return arr;
		}
		throw new TransactionError(PaymeError.TransactionNotFound, id);
	}
}

export default new TransactionService(transactionRepo, userRepo, productRepo);
