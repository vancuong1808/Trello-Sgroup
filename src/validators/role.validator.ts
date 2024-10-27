import { body } from "express-validator"

export const validateRoleName = [
    body('roleName')
        .notEmpty().withMessage("Role name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Role name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Role name not have any spaces")
        .matches(/^[A-Z]+$/).withMessage("Role name mus be uppercase"),
]

export const validateAssignRolePermission = [
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
    body('permissionId')
        .notEmpty().withMessage("PermissionId must be not empty")
        .isLength({ min: 1 }).withMessage("PermissionId at least 1 number")
        .isNumeric().withMessage("PermissionId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("PermissionId not have any spaces"),
]

export const validateRemoveRolePermission = [
    body('permissionId')
        .notEmpty().withMessage("PermissionId must be not empty")
        .isLength({ min: 1 }).withMessage("PermissionId at least 1 number")
        .isNumeric().withMessage("PermissionId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("PermissionId not have any spaces"),
]