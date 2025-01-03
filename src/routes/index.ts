import express from 'express'
import authRoute from './apis/auth.routes';
import userRoute from './apis/user.routes';
import roleRoute from './apis/role.routes';
import permissionRoute from './apis/permission.routes';
import workspaceRoute from './apis/workspace.routes';
import boardRoute from './apis/board.routes';
import cardRoute from './apis/card.routes';
import listRoute from './apis/list.routes';
import attachRoute from './apis/attachment.routes';
import commentRoute from './apis/comment.routes';
import todoRoute from './apis/todo.routes';
import todolistRoute from './apis/todolist.routes';
import { sseHandler } from '../handlers/sse.handler';
const routes = express.Router();

routes.use("/auth", authRoute );
routes.use("/users", userRoute );
routes.use("/roles", roleRoute );
routes.use("/permissions", permissionRoute );
routes.use("/workspaces", workspaceRoute );
routes.use("/boards", boardRoute );
routes.use("/lists", listRoute );
routes.use("/cards", cardRoute );
routes.use("/attachments", attachRoute );
routes.use("/comments", commentRoute );
routes.use("/todos", todoRoute );
routes.use("/todolists", todolistRoute );
routes.get("/notifications", sseHandler);

export default routes;
