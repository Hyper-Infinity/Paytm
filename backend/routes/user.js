const { Router } = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const { userSignup, userSignin, userUpdate } = require("../types")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares");

const router = Router();

router.post('/signup', async (req, res) => {
    const currUser = req.body;
    const val = userSignup.safeParse(currUser);
    if(!val.success) {
        res.status(411).json({
            msg: "You entered wrong input !"
        })
        return;
    }
    const ifExists = await User.findOne({
        userName: currUser.userName
    })

    if(ifExists) {
        res.status(411).json({
            msg: "User already exists ! Try with different user name."
        })
        return;
    }

    const hashedPassword = await newUser.createHash(req.body.password);
    const newUser = await User.create({
        userName: currUser.userName,
        password: hashedPassword,
        firstName: currUser.firstName,
        lastName: currUser.firstName
    })

    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1 + (Math.random() * 10000)
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        token,
        message: "User created successfully.",
    });
})

router.post('/signin', async (req, res) => {
    const currUser = req.body;
    const val = userSignin.safeParse(currUser);
    if(!val.success) {
        res.status(411).json({
            msg: "You entered wrong input !"
        })
        return;
    }

    const foundUser = await User.findOne({ email: currUser.userName });

    if(!foundUser) {
        res.status(411).json({
            message: "User not found."
        })
        return;
    }   

    if(await foundUser.validatePassword(currUser.password)) {
        const userId = foundUser._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);
        res.status(200).json({
            token
        })
    }
    else {
        res.status(400).json({
            message: "Incorrect Password",
        });
    }
})

router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = userUpdate.safeParse(body);

    if(!body || !success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    if(body.password) {
        const hashedPassword = await newUser.createHash(req.body.password);
        body.password = hashedPassword;
    }
    await User.updateOne({_id: req.userId}, body);
    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const userList = await User.find({$or: [{firstName: {"$regex": filter}}, {lastName: {"$regex": filter}}]});
    const ansList = userList.map((val) => {
        return {
            userName: val.userName,
            firstName: val.firstName,
            lastName: val.lastName,
            _id: val._id
        }
    })
    res.status(200).json({
        users: ansList
    })
})

module.exports = router;