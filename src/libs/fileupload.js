import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import myKey from '../config/env.js';

// const s3 = new aws.S3({
// 	endpoint: spacesEndpoint,
// 	accessKeyId: myKey.AWS_ACCESS_KEY_ID,
// 	secretAccessKey: myKey.AWS_SECRET_ACCESS_KEY,
// });

const config = {
	region: 'sfo3',
	credentials: {
		accessKeyId: myKey.AWS_ACCESS_KEY_ID,
		secretAccessKey: myKey.AWS_SECRET_ACCESS_KEY,
	},
};
const s3 = new S3Client(config);

export const upload = multer({
	storage: multerS3({
		s3,
		acl: 'public-read',
		bucket: myKey.BUKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, cb) => {
			const fileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
			cb(null, `${fileName}${path.extname(file.originalname)}`);
		},
	}),
});
