const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

const User = require('../models/user');

exports.alreadyLoggedIn = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decode;
        const user = await User.findOne({ _id });

        if (!user) {
            return res.send({
                alreadyLoggedIn: false,
                message: 'invalid'
            })
        }

        return res.send({
            alreadyLoggedIn: true
        });
    } catch (error) {
        return res.send({
            alreadyLoggedIn: false,
            message: 'invalid',
            error
        })
    }
}

exports.signUp = async (req, res) => {
    const { body: { email, password } } = req;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2 days'
    });
    res.send({
        email,
        token,
        success: true
    });
}

exports.login = async (req, res) => {
    const sendError = () => {
        res.send({
            message: 'User not found or password id not match'
        })
    }

    const { body: { email, password } } = req;

    const user = await User.findOne({ email });

    if (!user) {
        return sendError();
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2 days'
            // expiresIn: 10
        });

        return res.send({
            email,
            token,
            success: true
        })
    } else {
        return sendError();
    }
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});