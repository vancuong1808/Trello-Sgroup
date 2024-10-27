import express from 'express'
import authRoute from './apis/auth.routes';
import userRoute from './apis/user.routes';
import roleRoute from './apis/role.routes'
const routes = express.Router();

routes.use("/auth", authRoute );
routes.use("/user", userRoute );
routes.use("/role", roleRoute );

export default routes;