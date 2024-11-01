import express from "express"
import { validateHandler } from "../../handlers/validator.handler.ts"
import { validateBoardName } from "../../validators/board.validator.ts";
import { authenticate } from "../../middlewares/auth.middleware.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import boardController from "../../controllers/board.controller";
const userRoute = express.Router();

userRoute.get("/get/", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getAllBoards );

userRoute.get("/get/:id", authenticate, RequiredPermissions( Permissions.VIEW_BOARD ), boardController.getBoardById );

userRoute.post("/create", authenticate, RequiredPermissions( Permissions.CREATE_BOARD ), validateBoardName, validateHandler, boardController.createBoard );

userRoute.put("/update/:id", authenticate, RequiredPermissions( Permissions.UPDATE_BOARD ), validateBoardName, validateHandler, boardController.updateBoard );

userRoute.delete("/delete/:id", authenticate, RequiredPermissions( Permissions.DELETE_BOARD ), boardController.deleteBoard );

export default userRoute