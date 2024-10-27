import express from 'express'
import authRoute from './apis/auth.routes';
import userRoute from './apis/user.routes';
import roleRoute from './apis/role.routes';
import permissionRoute from './apis/permission.routes';

const routes = express.Router();

routes.use("/auth", authRoute );
routes.use("/user", userRoute );
routes.use("/role", roleRoute );
routes.use("/permission", permissionRoute );

export default routes;