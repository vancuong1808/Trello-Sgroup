import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import cardController from "../../controllers/card.controller";
import { validateHandler } from "../../handlers/validator.handler.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { CheckMemberInCard, CheckMemberInList } from "../../middlewares/checkMember.middleware.ts";
import cardValidator from "../../validators/card.validator.ts";
const cardRoute = express.Router();

cardRoute.get("/card", authenticate, cardController.getAllCards );

cardRoute.get("/card/:cardId", authenticate, cardController.getCardById );

cardRoute.post("/card", authenticate, CheckMemberInList, RequiredPermissions( Permissions.ADD_CARD ), cardValidator.validateAddCard, validateHandler, cardController.addCard );

cardRoute.post("/card/add/member", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.ADD_MEMBER_TO_CARD ), cardValidator.validateUserToCard, validateHandler, cardController.addMemberToCard );

cardRoute.delete("/card/remove/member", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.REMOVE_MEMBER_FROM_CARD ), cardValidator.validateUserToCard, validateHandler, cardController.removeMemberFromCard );

cardRoute.put("/card/:cardId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.UPDATE_CARD ), cardValidator.validateUpdateCard, validateHandler, cardController.updateCard );

cardRoute.delete("/card/:cardId", authenticate, CheckMemberInCard, RequiredPermissions( Permissions.DELETE_CARD ), cardController.deleteCard );

export default cardRoute
