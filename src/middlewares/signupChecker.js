import { body, validationResult } from "express-validator";

//email format validation
const validEmail = () =>
  body("email", "email is not valid").trim().isEmail().normalizeEmail();

//custom validator parameter
//note: value equals the "password" send from the body("password", ...)
const isStronger = (value) => {
  const testStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_0-9])/.test(value);
  if (!testStrong) {
    throw new Error(
      "Stronger password required: uppercase, lowercase, number, and special character"
    );
  }
  return value;
};

//validate password-string length, and additional custom restrictions
const validPassword = () => {
  return body("password", "Not a strong password: more than 6 characters")
    .trim()
    .isLength({ min: 6 })
    .custom(isStronger);
};

//custom validator for password and repassword coincidence
const passwordDoubleCheck = () =>
  body("password", "password verification failed").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Password and Password-verification are different");
    }
    return value;
  });

// validationResult method must be declared
// gathers all error validations and finally runs the next() for the middleware
const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const signupValidator = [
  validEmail(),
  validPassword(),
  passwordDoubleCheck(),
  checkErrors,
];
