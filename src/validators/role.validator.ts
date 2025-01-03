import { body } from "express-validator"

class RoleValidator {
    validateAddRole = [
        body('roleName')
            .notEmpty().withMessage("Role name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Role name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Role name not have any spaces")
    ]

    validateUpdateRole = [
        body('roleName')
            .optional()
            .notEmpty().withMessage("Role name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Role name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Role name not have any spaces")
    ]

    validatePermissionOfRole = [
        body('permissionId')
            .notEmpty().withMessage("Permission id must be not empty")
            .isNumeric().withMessage("Permission id must be a number"),
        body('roleId')
            .notEmpty().withMessage("Role id must be not empty")
            .isNumeric().withMessage("Role id must be a number")
    ]
}

export default new RoleValidator()
