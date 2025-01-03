import { body } from "express-validator"

class BoardValidator {
    validateAddBoard = [
        body('boardName')
            .notEmpty().withMessage("Board name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Board name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Board name not have any spaces"),
        body('workspaceId')
            .notEmpty().withMessage("Workspace id must be not empty")
            .isNumeric().withMessage("Workspace id must be a number")
    ]

    validateUpdateBoard = [
        body('boardName')
            .optional()
            .notEmpty().withMessage("Board name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Board name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Board name not have any spaces")
    ]

    validateUserToBoard = [
        body('userId')
            .notEmpty().withMessage("User id must be not empty")
            .isNumeric().withMessage("User id must be a number"),
        body('boardId')
            .notEmpty().withMessage("Board id must be not empty")
            .isNumeric().withMessage("Board id must be a number")
    ]
}

export default new BoardValidator()
