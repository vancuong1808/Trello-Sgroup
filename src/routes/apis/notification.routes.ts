import express, { NextFunction, Request, Response } from "express";
import { sseHandler, sseSendMessage } from "../../handlers/sse.handler";
import { authenticate } from "../../middlewares/auth.middleware";
import notificationRepository from "../../repositories/notification.repository";
import { Notification } from "../../orm/entities/notification.entity";
import responseHandler from "../../handlers/response.handler.ts";
import { validateHandler } from "../../handlers/validator.handler.ts";
import { RequiredPermissions } from "../../middlewares/permission.middleware.ts";
import { Permissions } from "../../common/enums/permissions.ts";
import NotificationValidator from "../../validators/notification.validator.ts";
const notificationRoute = express.Router();

notificationRoute.post("/notification", authenticate, RequiredPermissions(Permissions.SEND_NOTIFICATION), NotificationValidator.validateAddNotification, validateHandler, async(req : Request, res : Response, next : NextFunction) => {
    try {
        const message = req.body.message;
        const newNotification = new Notification();
        newNotification.description = message;
        await notificationRepository.addNotification(newNotification);
        sseSendMessage(req, res, message);
        responseHandler.created(res, "Notification sent", {});
    } catch (error: unknown) {
        next(error)
    }
});

notificationRoute.get("/sse", authenticate, sseHandler);

notificationRoute.get("/", authenticate, async(req : Request, res : Response, next : NextFunction)  => {
    try {
        const notifications = await notificationRepository.getNotifications();
        responseHandler.ok(res, "Get notifications successfully", notifications);
    } catch (error: unknown) {
        next(error)
    }
});

export default notificationRoute