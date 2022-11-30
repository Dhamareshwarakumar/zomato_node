const express = require('express');
const router = express.Router();
const { validateLogin } = require('../validations/auth');

const { login } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.json({ msg: 'Get yourself an identity' });
});

router.post(
    '/login',
    validateLogin,
    (req, res) => {
        login(req.body.email, req.body.password)
            .then((token) => {
                return res.json({ msg: 'Login successful', token });
            })
            .catch((err) => {
                return res.status(err.status).json({ msg: err.msg, err: err.err });
            });
    }
);


module.exports = router;