import { body } from "express-validator"

class TodoListValidator {
    validateAddTodoList = [
        body('todolistName')
            .notEmpty().withMessage("TodoList name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("TodoList name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("TodoList name not have any spaces"),
        body('cardId')
            .notEmpty().withMessage("Card id must be not empty")
            .isNumeric().withMessage("Card id must be a number")
    ]

    validateUpdateTodoList = [
        body('todolistName')
            .optional()
            .notEmpty().withMessage("TodoList name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("TodoList name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("TodoList name not have any spaces")
    ]
}

export default new TodoListValidator();