import { body, validationResult } from "express-validator";

export const validEmail = () =>
  body("email", "email is not valid").trim().isEmail().normalizeEmail();

//function for custom chain validator
//value will be the password send from the body()
const isStronger = (value) => {
  const testStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_0-9])/.test(value);
  if (!testStrong) {
    throw new Error(
      "Stronger password required: uppercase, lowercase, number, and special character"
    );
  }
  return value;
};

export const validPassword = () => {
  return body("password", "Not a strong password: more than 6 characters")
    .trim()
    .isLength({ min: 6 })
    .custom(isStronger);
};

//custom validator for password and repassword coincidence
export const passwordDoubleCheck = () =>
  body("password", "password verification failed").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Password and Password-verification are different");
    }
    return value;
  });

export const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
