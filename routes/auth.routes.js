const User = require("../models/user.model");

const router = require("express").Router();

const { body, validationResult } = require('express-validator')

router.post('/login', (req, res, next) => {
    res.json({
        message: 'Auth login'
    })
})

router.post('/register', [
    body('email').trim().isEmail().withMessage('Email provided is not valid!')
    .normalizeEmail().toLowerCase(),
    body('password').trim().isLength(2).withMessage('Minimum 2 characters required in password')
], async (req, res, next) => {
    try {
        const validResult = validationResult(req);
        if(!validResult.isEmpty()) {
            res.status(401)
            return res.json({errors: validResult.array()})
        }
        const {email, password, name} = req.body;
        const doesExist = await User.findOne({ email });
        if(doesExist) {
            res.status(400);
            return res.json({
                status: 400,
                message: 'User already exists'
            })
        }
        const user = new User({
            email, password, name
        });
        const result = await user.save();
        const { __v, _id, ...resp } = result._doc;
        res.json(resp);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post('/change-password', (req, res, next) => {
    res.json({
        message: 'Auth password change'
    })
})

router.post('/logout', (req, res, next) => {
    res.json({
        message: 'Auth logout'
    })
})

module.exports = router;