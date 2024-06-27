const mongoose = require("mongoose");
const crypto = require("crypto");

mongoose.connect("mongodb+srv://Admin:Vj38WBTzlitXh9wC@mydatabase1.atdipev.mongodb.net/paytmDb");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

userSchema.methods.createHash = async function (plainTextPassword) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
    .pbkdf2Sync(plainTextPassword, salt, 10, 32, "sha512")
    .toString("hex");
    return [salt, hashedPassword].join("#");
};

userSchema.methods.validatePassword = async function (candidatePassword) {
    const hashedPassword = this.password.split("#")[1];
    const salt = this.password.split("#")[0];
    const hash = crypto
    .pbkdf2Sync(candidatePassword, salt, 10, 32, "sha512")
    .toString("hex");
    if (hash === hashedPassword) {
        return true;
    }
    return false;
};

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('Users', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}