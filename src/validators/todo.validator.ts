import { body } from "express-validator"
class TodoValidator {
validateAddTodo = [
        body('todoName')
            .notEmpty().withMessage("Todo name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Todo name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Todo name not have any spaces"),
        body('todolistId')
            .notEmpty().withMessage("TodoList id must be not empty")
            .isNumeric().withMessage("TodoList id must be a number")
    ]

    validateUpdateTodo = [
        body('todoName')
            .optional()
            .notEmpty().withMessage("Todo name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Todo name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Todo name not have any spaces")
    ]
}

export default new TodoValidator()