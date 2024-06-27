const z = require("zod");

const userSignup = z.object({
    userName: z.string().email(),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
    firstName: z.string().max(50, { message: "Must be 50 or less characters long" }),
    LastName: z.string().max(50, { message: "Must be 50 or less characters long" })
})

const userSignin = z.object({
    userName: addEventListener.string().email(), 
    password: z.string()
})

const userUpdate = z.object({
    password: z.string().min(6, { message: "Must be 6 or more characters long" }).optional(),
    firstName: z.string().optional(),
    LastName: z.string().optional()
})

const transferReq = z.object({
    to: z.string(),
    amount: z.number().positive()
})

module.exports = {
    userSignup,
    userSignin,
    userUpdate,
    transferReq
}