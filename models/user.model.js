const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
});

userSchema.pre('save', async function (next) {
    try {
        if(!this.exists) {
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;