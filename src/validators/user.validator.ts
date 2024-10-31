import { body } from 'express-validator'

export const validateUpdateUser = [
    body('username')
        .optional()
        .notEmpty().withMessage("Username must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Username at least 3 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Username not have any spaces"),
    body('email')
        .optional()
        .notEmpty().withMessage("Email must be not empty")
        .isEmail().withMessage("Email not valid")
]

export const validateUser = [
    body('username')
        .notEmpty().withMessage("Username must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Username at least 3 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Username not have any spaces"),
    body('email')
        .notEmpty().withMessage("Email must be not empty")
        .isEmail().withMessage("Email not valid"),
    body('password')
        .notEmpty().withMessage("Password must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Password at least 6 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Password not have any spaces")
]

export const validateAssignUserRole = [
    body('userId')
        .notEmpty().withMessage("UserId must be not empty")
        .isLength({ min: 1 }).withMessage("UserId at least 1 number")
        .isNumeric().withMessage("UserId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("UserId not have any spaces"),
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
]

export const validateRemoveUserRole = [
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
]