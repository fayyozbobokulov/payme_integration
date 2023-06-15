import fs from 'fs/promises';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
// import myKey from '../config/env.js';

const AWS_ACCESS_KEY_ID = 'DO00J7RBGHCVUELLR2PJ';
const AWS_SECRET_ACCESS_KEY = '8lNwIAimIfk95RCdhkfvKjg91uTjSqrFdfDkYlVJjis';
const S3_INDPOINT = 'https://sfo3.digitaloceanspaces.com';

const s3 = new S3Client({
	region: 'sfo3', // Replace with your region
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
	endpoint: S3_INDPOINT,
});
export const fileUpload = async (req, res) => {
	try {
		// Read the file from Multer's destination
		const fileStream = createReadStream(req.file.path);

		// Setting up S3 upload parameters
		const params = {
			Bucket: 'imgs-digitaldreams',
			Key: req.file.originalname, // Use the original name of uploaded file
			Body: fileStream,
		};

		// Uploading files to the bucket
		const data = await s3.send(new PutObjectCommand(params));
		console.log('File uploaded successfully.');

		// Delete the file from local filesystem
		await fs.unlink(req.file.path);

		const fileURL = `${S3_INDPOINT}/imgs-digitaldreams/${req.file.originalname}`;
		return fileURL;
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).send('Error while uploading');
	}
};
