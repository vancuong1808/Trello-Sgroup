import { body } from "express-validator"

export const validateCard = [
    body('cardName')
        .notEmpty().withMessage("Card name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Card name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Card name not have any spaces")
]

export const validateTodoList = [
    body('todolistName')
    .notEmpty().withMessage("TodoList name must be not empty")
    .isLength({ min: 1, max: 32 }).withMessage("TodoList name at least 1 characters and maximum 32 characters")
    .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("TodoList name not have any spaces")
]

export const validateTodo = [
    body('todoName')
    .notEmpty().withMessage("Todo name must be not empty")
    .isLength({ min: 1, max: 32 }).withMessage("Todo name at least 1 characters and maximum 32 characters")
    .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Todo name not have any spaces")
]

export const validateComment = [
    body('comment')
    .notEmpty().withMessage("Comment must be not empty")
    .isLength({ min: 1, max: 100 }).withMessage("Comment at least 1 characters and maximum 100 characters")
    .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Comment not have any spaces")
]
