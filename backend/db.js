const mongoose = require("mongoose");
const argon2 = require("argon2");
mongoose.connect("mongodb+srv://Admin:Vj38WBTzlitXh9wC@mydatabase1.atdipev.mongodb.net/paytmDb");

const userSchema = new mongoose.Schema({
    username: {
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

UserSchema.methods.createHash = async function (plainTextPassword) {
    return await argon2.hash(plainTextPassword);
};

UserSchema.methods.validatePassword = async function (candidatePassword) {
    return await argon2.verify(this.password_hash, candidatePassword)
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