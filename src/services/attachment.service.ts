import { Attachment } from '../orm/entities/attachment.entity.ts';
import CardRepository from '../repositories/card.repository.ts';
import AttachmentRepository from '../repositories/attachment.repository.ts';
import { Result } from '../handlers/result.handler.ts';
import { notFoundError } from "../handlers/errors/customError";
import { v2 as cloudinary } from 'cloudinary';

class AttachmentService {
    async addAttachment( cardId : number, file : Express.Multer.File ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );   
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const newAttachment = new Attachment();
        newAttachment.fileName = file.originalname;
        newAttachment.filePath = file.path;
        newAttachment.publicId = file.filename;
        newAttachment.card = isExistedCard;
        await AttachmentRepository.addAttachment( newAttachment );
        return new Result( true, 201, "Create attachment successful" );
    }
    async deleteAttachment( cardId : number, attachmentId : number ) : Promise<Result> {
        const isExistedCard = await CardRepository.getCardById( cardId );
        if (!isExistedCard) {
            throw new notFoundError("Card not found");
        }
        const isExistedAttachment = await AttachmentRepository.getAttachmentById( cardId, attachmentId );
        if (!isExistedAttachment) {
            throw new notFoundError("Attachment not found");
        }
        if (isExistedAttachment.publicId) {
            await cloudinary.uploader.destroy(isExistedAttachment.publicId);
        }
        await AttachmentRepository.deleteAttachment( attachmentId );
        return new Result( true, 200, "Delete attachment successful" );
    }
}
export default new AttachmentService();

