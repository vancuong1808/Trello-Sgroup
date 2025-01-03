import { body } from "express-validator"

class WorkspaceValidator {
    validateAddWorkspace = [
        body('workspaceName')
            .notEmpty().withMessage("Workspace name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Workspace name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Workspace name not have any spaces")
    ]

    validateUpdateWorkspace = [
        body('workspaceName')
            .optional()
            .notEmpty().withMessage("Workspace name must be not empty")
            .isLength({ min: 1, max: 32 }).withMessage("Workspace name at least 1 characters and maximum 32 characters")
            .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Workspace name not have any spaces")
    ]

    validateUserToWorkspace = [
        body('userId')
            .notEmpty().withMessage("User id must be not empty")
            .isNumeric().withMessage("User id must be a number"),
        body('workspaceId')
            .notEmpty().withMessage("Workspace id must be not empty")
            .isNumeric().withMessage("Workspace id must be a number")
    ]
}

export default new WorkspaceValidator()
