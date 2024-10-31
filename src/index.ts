import express, { NextFunction, Request, Response } from "express";
import { Server, createServer } from "http";
import "reflect-metadata";
import { mysqlSource } from './configs/data-source.config';
import { envServer } from "./env";
import { notFoundError } from "./handlers/errors/customError";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import routes from "./routes/index";
const app = express();
const httpServer : Server = createServer( app );
// setup database
mysqlSource.initialize()
    .then(() => {
        console.log("Database is connected");
    })
    .catch((err) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        console.log("Database is not connected", err);
    })
// setup Middleware
app.use( express.json() );
app.use("/api", routes );
app.use("*", ( req : Request, res : Response, next : NextFunction ) =>{
    next( new notFoundError("Not Found 404") );
});
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});
const PORT : string | number = envServer.PORT;
httpServer.listen( PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
})