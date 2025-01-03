import { body } from 'express-validator'

class UserValidator {
    validateUpdateUser = [
        body('username')
            .notEmpty().withMessage("Username must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Username at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Username not have any spaces"),
        body('email')
            .notEmpty().withMessage("Email must be not empty")
            .isEmail().withMessage("Email must be a valid email")
    ]

    validateRoleOfUser = [
        body('userId')
            .notEmpty().withMessage("User id must be not empty")
            .isNumeric().withMessage("User id must be a number"),
        body('roleId')
            .notEmpty().withMessage("Role id must be not empty")
            .isNumeric().withMessage("Role id must be a number")
    ]

}

export default new UserValidator()
