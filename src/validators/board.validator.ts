import { body } from "express-validator"

export const validateBoard = [
    body('boardName')
        .notEmpty().withMessage("Board name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Board name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Board name not have any spaces")
]
