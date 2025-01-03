import { mysqlSource } from '../configs/data-source.config.ts';
import { Attachment } from '../orm/entities/attachment.entity';

class AttachmentRepository {
    private readonly attachmentRepository = mysqlSource.getRepository(Attachment);

    async addAttachment( attachment : Attachment ): Promise<Attachment | null> {
        const newAttachment = this.attachmentRepository.create( attachment );
        await this.attachmentRepository.save( newAttachment );
        return newAttachment;
    }

    async getAttachmentByIdInCard( cardId : number, attachmentId : number ): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findOne({
            select : ["id", "filePath", "publicId"],
            where : {
                id : attachmentId,
                card : {
                    id : cardId
                }
            },
            relations : ["card"]
        });
        return attachment;
    }

    async getAttachmentById( attachmentId : number ): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findOne({
            select : ["id", "filePath", "publicId"],
            where : {
                id : attachmentId
            },
            relations : ["card"]
        });
        return attachment;
    }

    async getAttachmentByPublicId( publicId : string ): Promise<Attachment | null> {
        const attachment = await this.attachmentRepository.findOne({
            select : ["id", "fileName", "filePath", "publicId"],
            where : {
                publicId : publicId
            },
            relations : ["card"]
        });
        return attachment;
    }

    async deleteAttachment( attachmentId : number ): Promise<void> {
        await this.attachmentRepository.delete( attachmentId );
    }

    async updateAttachment( attachmentId : number, attachment : Partial<Attachment> ): Promise<void> {
        await this.attachmentRepository.update( attachmentId, attachment );
    }

}

export default new AttachmentRepository();
