import express from 'express';
import { Permissions } from '../../common/enums/permissions.ts';
import { validateHandler } from '../../handlers/validator.handler.ts';
import { authenticate } from '../../middlewares/auth.middleware.ts';
import { RequiredPermissions } from '../../middlewares/permission.middleware.ts';
import { CheckMemberInComment, CheckMemberInCard } from '../../middlewares/checkMember.middleware.ts';
import CardValidator from '../../validators/card.validator.ts';
import commentController from '../../controllers/comment.controller.ts';
const commentRoute = express.Router();

commentRoute.get('/comment', authenticate, RequiredPermissions(Permissions.VIEW_COMMENT), commentController.getAllComments);

commentRoute.get('/comment/:commentId', authenticate, RequiredPermissions(Permissions.VIEW_COMMENT), commentController.getCommentById);

commentRoute.post('/comment', authenticate, CheckMemberInCard, RequiredPermissions(Permissions.ADD_COMMENT), CardValidator.validateAddCard, validateHandler, commentController.addComment);

commentRoute.put('/comment/:commentId', authenticate, CheckMemberInComment, RequiredPermissions(Permissions.UPDATE_COMMENT), CardValidator.validateUpdateCard, validateHandler, commentController.updateComment);

commentRoute.delete('/comment/:commentId', authenticate, CheckMemberInComment, RequiredPermissions(Permissions.DELETE_COMMENT), commentController.deleteComment);

export default commentRoute;
