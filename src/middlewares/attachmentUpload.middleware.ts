import { AttachmentUpload } from '../configs/cloudinary.config.ts';
import { badRequestError, notFoundError } from "../handlers/errors/customError";
import CardRepository from '../repositories/card.repository.ts';

export const AttachUploadSingleMiddleware = async (req: any, res: any, next: any) => {
    try {
        const cardId = Number(req.params.cardId);
        const card = await CardRepository.getCardById(cardId);
        if (!card) {
            throw new notFoundError("Card not found");
        }
        AttachmentUpload( cardId ).single('attachment')(req, res, async(err: unknown) => {
            if (err) {
                throw new badRequestError(`${err}`);
            }
            if (req.file) {
                req.file = req.file;
                next();
            } else {
                next();
            }
        });
    } catch (error : unknown) {
        next(new badRequestError(`${error}`));
    }
}
