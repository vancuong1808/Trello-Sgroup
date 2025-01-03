import { body } from 'express-validator';

class ListValidator {
    validateAddList = [
        body('listName')
            .notEmpty().withMessage("List name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("List name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("List name not have any spaces"),
        body('boardId')
            .notEmpty().withMessage("Board id must be not empty")
            .isNumeric().withMessage("Board id must be a number")
    ]

    validateUpdateList = [
        body('listName')
            .optional()
            .notEmpty().withMessage("List name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("List name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("List name not have any spaces")
    ]
}

export default new ListValidator()
