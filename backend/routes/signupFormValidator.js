import {check} from "express-validator";
import { validationResult } from 'express-validator';
const signupValidation = [
  check("inputField.firstName").trim().escape().notEmpty().withMessage("First name is required!"),
  check("inputField.lastName").trim().escape().notEmpty().withMessage("Last name is required"),
  check("inputField.email").trim().escape().isEmail().normalizeEmail().withMessage("Invalid email"),
  check("inputField.password").trim().escape().notEmpty().isLength({ min: 6 }).withMessage("Password too short"),
  check("inputField.confirmPass").trim().escape().custom((value, { req }) => {
    if (value !== req.body.inputField.password) {
      throw new Error("Passwords do not match!");
    }
    return true;
  }),
  check("inputField.membership").escape(),
  (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
    next();
  }
];

export default signupValidation;