import { body } from "express-validator"

class PermissionValidator {
    validateAddPermission = [
        body('permissionName')
            .notEmpty().withMessage("Permission name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Permission name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Permission name not have any spaces")
    ]

    validateUpdatePermission = [
        body('permissionName')
            .optional()
            .notEmpty().withMessage("Permission name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Permission name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Permission name not have any spaces")
    ]
}
        
export default new PermissionValidator()
