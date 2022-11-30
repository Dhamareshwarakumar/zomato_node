const User = require('../models/User');
const jwt = require('jsonwebtoken');


const login = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    register(email, password)
                        .then((token) => resolve(token))
                        .catch((err) => reject(err));
                } else if (user.authenticate(password)) {
                    user = {
                        user_id: user._id,
                        email: user.email,
                        role: user.role
                    };
                    generateToken(user)
                        .then((token) => resolve(token))
                        .catch((err) => reject(err));
                } else {
                    reject({ msg: 'Invalid Credentials', err: { password: 'Invalid password' }, status: 422 });
                }
            })
            .catch((err) => {
                console.error(`[auth][login][${email}] Error: ${err}`);
                reject({ msg: 'Internal server error', err: {}, status: 500 });
            });
    });
};

const register = (email, password) => {
    return new Promise((resolve, reject) => {
        const newUser = new User({
            email,
            password
        });

        newUser.save()
            .then((user) => {
                user = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role
                };
                generateToken(user)
                    .then((token) => resolve(token))
                    .catch((err) => reject(err));
            })
            .catch((err) => {
                console.error(`[auth][register][${email}] Error: ${err}`);
                reject({ msg: 'Internal server error', err: {}, status: 500 });
            });
    });
};

const generateToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            user,
            process.env.JWT_KEY,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error(`[auth][generateToken][${user.email}] Error: ${err}`);
                    reject({ msg: 'Internal server error', err: {}, status: 500 });
                }
                resolve(token);
            }
        );
    });
};


module.exports = {
    login
};