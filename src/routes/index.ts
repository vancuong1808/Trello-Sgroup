import express from 'express'
import authRoute from './apis/auth.routes';
import userRoute from './apis/user.routes';
import roleRoute from './apis/role.routes';
import permissionRoute from './apis/permission.routes';
import workspaceRoute from './apis/workspace.routes';
import boardRoute from './apis/board.routes';
import cardRoute from './apis/card.routes';
import listRoute from './apis/list.routes';
import { sseHandler } from '../handlers/sse.handler';
const routes = express.Router();

routes.use("/auth", authRoute );
routes.use("/user", userRoute );
routes.use("/role", roleRoute );
routes.use("/permission", permissionRoute );
routes.use("/w", workspaceRoute );
routes.use("/w", boardRoute );
routes.use("/w", listRoute );
routes.use("/w", cardRoute );
routes.get("/sse", sseHandler);

export default routes;
