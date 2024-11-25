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

