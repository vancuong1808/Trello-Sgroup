import { body } from "express-validator"

export const validateRole = [
    body('roleName')
        .notEmpty().withMessage("Permission name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Permission name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Permission name not have any spaces")
        .matches(/^[A-Z]+(_[A-Z]+)+$/).withMessage("Permission must be follow this form [A-Z]_[A-Z]_....[A-Z]"),
]

