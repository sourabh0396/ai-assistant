import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { errorMessages } from '../constants/errorMessages.js';

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        // secure_distribution: process.env.SECURE_DISTRIBUTION,
        // upload_prefix: process.env.UPLOAD_PREFIX,
    });
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        // fs.unlinkSync(filePath);//to delete image
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return uploadResult.secure_url
    } catch (error) {
        console.error(error);
        throw new Error(errorMessages.UPLOAD.CLOUDINARY_ERROR);
    }
}

export default uploadOnCloudinary;