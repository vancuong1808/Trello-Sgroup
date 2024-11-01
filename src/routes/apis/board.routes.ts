import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateBoardName } from "../../validators/board.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import boardController from "../../controllers/board.controller";
const boardRoute = express.Router();

boardRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getAllBoards );

boardRoute.get("/get/:id", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getBoardById );

boardRoute.post("/create", authenticate, RequiredPermissions( Permissions.ADD_BOARD ), validateBoardName, validateHandler, boardController.addBoard );

boardRoute.put("/update/:id", authenticate, RequiredPermissions( Permissions.UPDATE_BOARD ), validateBoardName, validateHandler, boardController.updateBoard );

boardRoute.delete("/delete/:id", authenticate, RequiredPermissions( Permissions.DELETE_BOARD ), boardController.deleteBoard );

export default boardRoute