import fs from 'fs/promises';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import multer from 'multer';

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

const uploadSingle = multer({ dest: 'uploads/' }).single('file');

function attachFile(req, res) {
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

async function uploadFileToCloud(file) {
	try {
		// Read the file from Multer's destination
		const fileStream = createReadStream(path);

		// Setting up S3 upload parameters
		const params = {
			Bucket: 'imgs-digitaldreams',
			Key: file.originalname, // Use the original name of uploaded file
			Body: fileStream,
		};

		// Uploading files to the bucket
		const data = await s3.send(new PutObjectCommand(params));
		console.log('File uploaded successfully.');

		// Delete the file from local filesystem
		await fs.unlink(file.path);

		const fileURL = `${S3_INDPOINT}/imgs-digitaldreams/${file.originalname}`;
		return fileURL;
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).send('Error while uploading');
	}
};


export async function uploadFile(req, res) {
	await attachFile(req, res);
	return await uploadFileToCloud(req.file);
}

