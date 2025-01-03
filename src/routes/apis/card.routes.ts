import express from "express";
import { Permissions } from "../../common/enums/permissions.ts";
import cardController from "../../controllers/card.controller";
import { validateHandler } from "../../handlers/validator.handler.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import CardValidator from "../../validators/card.validator";
const cardRoute = express.Router();

cardRoute.get("/card", authenticate, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getAllCards );

cardRoute.get("/card/:cardId", authenticate, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getCardById );

cardRoute.post("/card", authenticate, RequiredPermissions( Permissions.ADD_CARD ), CardValidator.validateAddCard, validateHandler, cardController.addCard );

cardRoute.post("/card/add/member", authenticate, RequiredPermissions( Permissions.ADD_MEMBER_TO_CARD ), CardValidator.validateUserToCard, validateHandler, cardController.addMemberToCard );

cardRoute.put("/card/:cardId", authenticate, RequiredPermissions( Permissions.UPDATE_CARD ), CardValidator.validateUpdateCard, validateHandler, cardController.updateCard );

cardRoute.delete("/card/:cardId", authenticate, RequiredPermissions( Permissions.DELETE_CARD ), cardController.deleteCard );

export default cardRoute
