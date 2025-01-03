import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import { AttachUploadSingleMiddleware } from "../../middlewares/attachmentUpload.middleware.ts";
import { validateHandler } from "../../handlers/validator.handler.ts";
import CardValidator from "../../validators/card.validator";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { CheckMemberInCard } from "../../middlewares/checkMember.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import attachmentController from "../../controllers/attachment.controller";
const uploadRoute = express.Router();

uploadRoute.post("/attachment/upload", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.UPLOAD_ATTACHMENT ), CardValidator.validateAttachment, validateHandler, AttachUploadSingleMiddleware, attachmentController.uploadAttachment );

uploadRoute.delete("/attachment/:attachmentId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.DELETE_ATTACHMENT ), attachmentController.deleteAttachment );

uploadRoute.get("/attachment/:attachmentId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.VIEW_ATTACHMENT ), attachmentController.getAttachmentById );

export default uploadRoute
