import * as express from 'express'
import * as mongodb from 'mongodb'
import { collections } from '../database';

export const commentsRouter = express.Router();
commentsRouter.use(express.json())


commentsRouter.get('/', async (req, res) => {
    try {
        const comments = await collections.comments.find({}).toArray();
        res.send(comments)
    } catch (error) {
        res.send(error.message)
    }
})


commentsRouter.get('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { product_id: id };

        const product = await collections.comments.find(query).toArray();
        if (product) {
            res.send(product)
        } else {
            res.send(`Failed to find the product ID :${id}`)
        }
    } catch (error) {
        res.send('Failed to find the product ID')
    }
})



commentsRouter.post('/addComments', async (req, res) => {
    try {
        const comment = req.body;
        const result = await collections.comments.insertOne(comment)
        if (result.acknowledged) {
            res.send(`Created a new comment: ID ${result.insertedId}`)
        } else {
            res.send('Failed to create a new  comment')
        }
    } catch (error) {
        console.error(error);
        res.send('Failed to create the comment ID')
    }
})


commentsRouter.delete('/deleteComments/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.comments.deleteOne(query)

        if (result && result.deletedCount) {
            res.send(`We Removed comment with id : ${id}`)
        } else if (!result) {
            res.send(`Failed to remove Removed comment with id : ${id}`)
        } if (!result.deletedCount) {
            res.send(`Failed to find Removed comment with id : ${id}`)
        }

    } catch (error) {
        console.error(error);
        res.send(error.message)
    }
})