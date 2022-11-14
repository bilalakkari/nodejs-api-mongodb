import * as express from 'express'
import * as mongodb from 'mongodb'
import * as bcrypt from 'bcrypt'
import { collections } from '../database';

export const userRouter = express.Router();
userRouter.use(express.json())

userRouter.get('/', async (req, res) => {
    try {
        const users = await collections.users.find({}).toArray();
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
})

// userRouter.post('/', async (req, res) => {
//     try {
//         const user = req.body;
//         const saltRounds = 10;
//         const myPlaintextPassword = user.pwd;
//         bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
//             bcrypt.hash(myPlaintextPassword, salt, async (err: any, hash: any) => {
//                 user.pwd = hash;
//                 const result = await collections.users.insertOne(user)
//                 if (result.acknowledged) {
//                     res.send(`Created a new User: ID ${result.insertedId}`)
//                 } else {
//                     res.send('Failed to create a new User')
//                 }
//             });
//         });

//     } catch (error) {
//         console.error(error);
//         res.send(`Failed to create the User ID: Reason: ${error.message} `)
//     }
// })

userRouter.post('/addUser/', async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.users.insertOne(user)
        if (result.acknowledged) {
            res.send(`Created a new user: ID ${result.insertedId}`)
        } else {
            res.send('Failed to create a new  user')
        }
    } catch (error) {
        console.error(error.message);
        res.send('Failed to create the user ID')
    }
})


userRouter.post('/authenticate', async (req, res) => {
    try {
        const user = req.body;
        const query = { username: user.username };
        const FoundUser = await collections.users.findOne(query)
        if (FoundUser) {
            bcrypt.compare(user.pwd, FoundUser.pwd, (err: any, result: any) => {
                if (result) {
                    res.send('Mabrouk, Tfadal')
                } else {
                    res.send(`Jarreb Marra 2oukhra`)
                }
            })
        }
        else {
            res.send(`XYZ`)
        }
    } catch (error) {
        console.error(error);
        res.send(`Failed to create the User ID: Reason: ${error.message} `)
    }
})





