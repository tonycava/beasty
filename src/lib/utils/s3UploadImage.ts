import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { env } from '$env/dynamic/private';

const s3Client = new S3Client({
	region: env.AWS_REGION || 'eu-west-3',
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY || ''
	}
});

const bucketName = env.S3_BUCKET_NAME || 'beasty-app';

async function fileToBuffer(file: File): Promise<Buffer> {
	const arrayBuffer = await file.arrayBuffer();
	return Buffer.from(arrayBuffer);
}

export async function uploadToS3(file: File): Promise<string | null> {
	try {
		if (!file.type.startsWith('image/')) {
			console.error("Le fichier n'est pas une image");
			return null;
		}

		const extension = file.name.split('.').pop() || 'jpg';
		const key = `animals/${randomUUID()}.${extension}`;

		const buffer = await fileToBuffer(file);

		const params = {
			Bucket: bucketName,
			Key: key,
			Body: buffer,
			ContentType: file.type
		};

		const command = new PutObjectCommand(params);
		await s3Client.send(command);

		const getCommand = new GetObjectCommand({
			Bucket: bucketName,
			Key: key
		});

		return getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
	} catch (error) {
		console.error("Erreur lors de l'upload vers S3:", error);
		return null;
	}
}

export async function getS3FileUrl(key: string): Promise<string> {
	const command = new GetObjectCommand({
		Bucket: bucketName,
		Key: key
	});

	return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}