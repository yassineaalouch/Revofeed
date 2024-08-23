import multiparty from 'multiparty';
import { PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import fs from 'fs';

const bucketName = process.env.BUCKET_NAME;

export default async function handle(req, res) {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    if (req.method === 'POST') {
        const form = new multiparty.Form();
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        const links = [];
        for (const file of files.file) {
            const ext = file.originalFilename.split('.').pop();
            const newFilename = Date.now() + '.' + ext;
            await client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            }));
            const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
            links.push(link);
        }

        return res.json({ links });


    } else if (req.method === 'DELETE') {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    await new Promise((resolve) => req.on('end', resolve));
    const { key } = JSON.parse(data);

    try {
        await client.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        }));
        return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting file', error });
    }
}
 else {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

export const config = {
    api: { bodyParser: false },
};
