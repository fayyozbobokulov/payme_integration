import multer from 'multer';
const uploadSingle = multer({ dest: 'uploads/' }).single('file');

export const uploadManually = (req, res) => {
	return new Promise((resolve, reject) => {
		uploadSingle(req, res, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
