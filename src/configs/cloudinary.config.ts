import multer from "multer";
import  cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import { envCloudinary } from '../env.ts';;

cloudinary.v2.config({
    cloud_name : envCloudinary.CLOUD_NAME,
    api_key : envCloudinary.API_KEY,
    api_secret : envCloudinary.API_SECRET
});

export const AttachmentUpload = ( id : number ) => {
    const storage = cloudinaryStorage({
        cloudinary : cloudinary.v2,
        params: async (req, file) => {
         return {
          folder: 'trello-attachments',
          format: 'jpeg',
          public_id: file.originalname + '-' + id,
        };
      },
    });

    return multer({ storage : storage });
}
