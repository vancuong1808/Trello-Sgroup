import { body } from 'express-validator';

export const validateList = [
    body('listName')
        .notEmpty().withMessage("List name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("List name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("List name not have any spaces")
]
