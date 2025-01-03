import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import { AttachUploadSingleMiddleware } from "../../middlewares/attachmentUpload.middleware.ts";
import { validateHandler } from "../../handlers/validator.handler.ts";
import CardValidator from "../../validators/card.validator";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import attachmentController from "../../controllers/attachment.controller";
const uploadRoute = express.Router();

uploadRoute.post("/attachment/upload", authenticate, RequiredPermissions( Permissions.UPLOAD_ATTACHMENT ), CardValidator.validateAttachment, validateHandler, AttachUploadSingleMiddleware, attachmentController.uploadAttachment );

uploadRoute.delete("/attachment/:attachmentId", authenticate, RequiredPermissions( Permissions.DELETE_ATTACHMENT ), attachmentController.deleteAttachment );

export default uploadRoute
