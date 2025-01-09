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

    validateUserToCard = [
        body('userId')
            .notEmpty().withMessage("User id must be not empty")
            .isNumeric().withMessage("User id must be a number"),
        body('cardId')
            .notEmpty().withMessage("Card id must be not empty")
            .isNumeric().withMessage("Card id must be a number")
    ]
}

export default new CardValidator()
