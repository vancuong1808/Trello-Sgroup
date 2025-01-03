import { body } from "express-validator"

class NotificationValidator {
    validateAddNotification = [
        body('message')
            .notEmpty().withMessage("Message must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Message at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Message not have any spaces")
    ]
}

export default new NotificationValidator()