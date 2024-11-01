import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateCardName } from "../../validators/card.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import cardController from "../../controllers/card.controller";
const cardRoute = express.Router();

cardRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getAllCards );

cardRoute.get("/get/:id", authenticate, RequiredPermissions( Permissions.VIEW_CARD ), cardController.getCardById );

cardRoute.post("/create", authenticate, RequiredPermissions( Permissions.ADD_CARD ), validateCardName, validateHandler, cardController.addCard );

cardRoute.put("/update/:id", authenticate, RequiredPermissions( Permissions.UPDATE_CARD ), validateCardName, validateHandler, cardController.updateCard );

cardRoute.delete("/delete/:id", authenticate, RequiredPermissions( Permissions.DELETE_CARD ), cardController.deleteCard );

export default cardRoute