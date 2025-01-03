import { body } from "express-validator"

class CardValidator {
    validateAddCard = [
        body('cardName')
            .notEmpty().withMessage("Card name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Card name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Card name not have any spaces"),
        body('listId')
            .notEmpty().withMessage("List id must be not empty")
            .isNumeric().withMessage("List id must be a number")
    ]

    validateUpdateCard = [
        body('cardName')
            .optional()
            .notEmpty().withMessage("Card name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Card name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Card name not have any spaces")
    ]

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

    validateAddComment = [
        body('comment')
            .notEmpty().withMessage("Comment must be not empty")
            .isLength({ min: 1, max: 100 }).withMessage("Comment at least 1 characters and maximum 100 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Comment not have any spaces"),
        body('cardId')
            .notEmpty().withMessage("Card id must be not empty")
            .isNumeric().withMessage("Card id must be a number")
    ]

    validateUpdateComment = [
        body('comment')
            .optional()
            .notEmpty().withMessage("Comment must be not empty")
            .isLength({ min: 1, max: 100 }).withMessage("Comment at least 1 characters and maximum 100 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Comment not have any spaces")
    ]

    validateUserToCard = [
        body('userId')
            .notEmpty().withMessage("User id must be not empty")
            .isNumeric().withMessage("User id must be a number"),
        body('cardId')
            .notEmpty().withMessage("Card id must be not empty")
            .isNumeric().withMessage("Card id must be a number")
    ]

    validateAttachment = [
        body('cardId')
            .notEmpty().withMessage("Card id must be not empty")
            .isNumeric().withMessage("Card id must be a number")
    ]
}

export default new CardValidator()
