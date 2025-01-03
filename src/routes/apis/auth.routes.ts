import express from "express"
import authController from "../../controllers/auth.controller.ts"
import AuthValidator from "../../validators/auth.validator.ts"
import { validateHandler } from "../../handlers/validator.handler.ts"
const authRoute = express.Router();

authRoute.post("/register", AuthValidator.validateRegister, validateHandler, authController.register );

authRoute.post("/login", AuthValidator.validateLogin, validateHandler, authController.login );

export default authRoute
