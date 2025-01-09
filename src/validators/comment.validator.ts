import { body } from "express-validator"

class CommentValidator {
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
}

export default new CommentValidator()