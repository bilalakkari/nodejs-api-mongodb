import * as express from 'express'
import * as mongodb from 'mongodb'
import { collections } from '../database'

export const cartRouter = express.Router();
cartRouter.use(express.json())


cartRouter.get('/', async (req, res) => {
    try {
        const cartItems = await collections.cart.find({}).toArray();
        res.send(cartItems)
    } catch (error) {
        res.send(error.message)
    }
})


cartRouter.get('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { user_id: id };

        const product = await collections.cart.find(query).toArray();
        if (product) {
            res.send(product)
        } else {
            res.send(`Failed to find the product ID :${id}`)
        }
    } catch (error) {
        res.send('Failed to find the product ID')
    }
})


cartRouter.get('/:product_id/:user_id', async (req, res) => {
    try {
        const product_id = req?.params?.product_id;

        const user_id = req?.params?.user_id;

        const query = { 'product._id': product_id, user_id: user_id };

        console.log(query)

        const product = await collections.cart.find(query).toArray();
        if (product) {
            res.send(product)
        } else {
            res.send(`Failed to find the product ID :${user_id}`)
        }
    } catch (error) {
        res.send('Failed to find the product ID')
    }
})


cartRouter.post('/addProductItem/', async (req, res) => {
    try {
        const product = req.body;
        const result = await collections.cart.insertOne(product)
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


cartRouter.put('/editProductItemQuantity/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const quantity = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.cart.updateOne(query, { $set: quantity })
        if (result && result.matchedCount) {
            res.send(`We Updated product with id : ${id}`)
        } else if (!result.matchedCount) {
            res.send(`Failed to Find Removed product with id : ${id}`)
        } else {
            res.send(`Failed to Update product with id : ${id}`)
        }
    } catch (error) {
        console.error(error.message);
        res.send(`Failed to Update the product ID: Reason : ${error.message}`)
    }
})


cartRouter.delete('/deleteProductItem/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.cart.deleteOne(query)

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