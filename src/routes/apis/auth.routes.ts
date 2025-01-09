import express from "express"
import authController from "../../controllers/auth.controller.ts"
import authValidator from "../../validators/auth.validator.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
const authRoute = express.Router();

authRoute.post("/register", authValidator.validateRegister, validateHandler, authController.register );

authRoute.post("/login", authValidator.validateLogin, validateHandler, authController.login );

export default authRoute
