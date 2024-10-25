import express from 'express'
import authRoute from './apis/auth.routes';
const routes = express.Router();

routes.use("/auth", authRoute );

export default routes;