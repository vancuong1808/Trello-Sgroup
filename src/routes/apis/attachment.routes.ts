import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import { AttachUploadSingleMiddleware } from "../../middlewares/attachmentUpload.middleware.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { CheckMemberInCard } from "../../middlewares/checkMember.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import attachmentController from "../../controllers/attachment.controller";
const uploadRoute = express.Router();

uploadRoute.post("/attachment/upload/:cardId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.UPLOAD_ATTACHMENT ), AttachUploadSingleMiddleware, attachmentController.uploadAttachment );

uploadRoute.delete("/attachment/:attachmentId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.DELETE_ATTACHMENT ), attachmentController.deleteAttachment );

uploadRoute.get("/attachment/:attachmentId", authenticate, attachmentController.getAttachmentById );

uploadRoute.get("/attachment", authenticate, attachmentController.getAllAttachments );

export default uploadRoute
