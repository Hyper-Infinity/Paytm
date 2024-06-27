const { Router, response } = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const { transferReq } = require("../types");
const { default: mongoose } = require("mongoose");

const router = Router();
router.use(authMiddleware);

router.get('/balance', async (req, res) => {
    const userData = await Account.findOne({userId: req.userId});
    res.status(200).json({
        balance: userData.balance
    })
})

router.post('/transfer', async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

        const txnData = req.body;
        const { success } = transferReq.safeParse(txnData);
        if(!success) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalide transection input !"
            })
        }

        const receiver = await Account.findOne({userId: txnData.to});
        if(!receiver) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "User Does't Exists !"
            })
        }

        const sender = await Account.findOne({userId: req.userId});
        if(sender.balance < txnData.amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        await Account.findOneAndUpdate({userId: txnData.to}, {
            $inc: {
                balance: txnData.amount
            }
        })

        await Account.findOneAndUpdate({userId: req.userId}, {
            $inc: {
                balance: -txnData.amount
            }
        })

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer Successful"
    })
})

module.exports = router;