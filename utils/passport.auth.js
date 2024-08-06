const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const User = require('../models/user.model')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if(!user) {
            done()
        }
    } catch (error) {
        done(error)
    }
}))
