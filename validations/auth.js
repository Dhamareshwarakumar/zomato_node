const isEmpty = require('./is_empty');
const { EMAIL_REGEX } = require('./regex');


const validateLogin = (req, res, next) => {
    const errors = {};

    if (isEmpty(req.body.email)) {
        errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (isEmpty(req.body.password)) {
        errors.password = 'Password is required';
    } else if (req.body.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (!isEmpty(errors)) {
        return res.status(422).json({ msg: 'Validation failed', err: errors });
    }
    next();
}

module.exports = {
    validateLogin
}