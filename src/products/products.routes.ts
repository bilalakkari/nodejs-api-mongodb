import * as express from 'express'
import * as mongodb from 'mongodb'
import { collections } from '../database';

export const productRouter = express.Router();
productRouter.use(express.json())


productRouter.get('/', async (req, res) => {
    try {
        const products = await collections.products.find({}).toArray();
        res.send(products)
    } catch (error) {
        res.send(error.message)
    }
})


productRouter.get('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };

        const product = await collections.products.findOne(query)
        if (product) {
            res.send(product)
        } else {
            res.send(`Failed to find the product ID :${id}`)
        }
    } catch (error) {
        res.send('Failed to find the product ID')
    }
})


productRouter.post('/addProduct', async (req, res) => {
    try {
        const product = req.body;
        const result = await collections.products.insertOne(product)
        if (result.acknowledged) {
            res.send(`Created a new product: ID ${result.insertedId}`)
        } else {
            res.send('Failed to create a new  product')
        }
    } catch (error) {
        console.error(error);
        res.send('Failed to create the product ID')
    }
})


productRouter.put('/editProduct/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const product = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.products.updateOne(query, { $set: product })
        if (result && result.matchedCount) {
            res.send(`We Updated product with id : ${id}`)
        } else if (!result.matchedCount) {
            res.send(`Failed to Find Removed product with id : ${id}`)
        } else {
            res.send(`Failed to Update product with id : ${id}`)
        }
    } catch (error) {
        console.error(error);
        res.send(`Failed to Update the product ID: Reason : ${error.message}`)
    }
})


productRouter.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.products.deleteOne(query)

        if (result && result.deletedCount) {
            res.send(`We Removed product with id : ${id}`)
        } else if (!result) {
            res.send(`Failed to remove Removed product with id : ${id}`)
        } if (!result.deletedCount) {
            res.send(`Failed to find Removed product with id : ${id}`)
        }

    } catch (error) {
        console.error(error);
        res.send(error.message)
    }
})