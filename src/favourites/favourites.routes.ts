import * as express from 'express'
import * as mongodb from 'mongodb'
import { collections } from '../database';

export const favouritesRouter = express.Router();
favouritesRouter.use(express.json())


favouritesRouter.get('/', async (req, res) => {
    try {
        const favourites = await collections.favourites.find({}).toArray();
        res.send(favourites)
    } catch (error) {
        res.send(error.message)
    }
})


favouritesRouter.get('/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { user_id: id };

        const favourites = await collections.favourites.find(query).toArray();
        if (favourites) {
            res.send(favourites)
        } else {
            res.send(`Failed to find the favourites_product ID :${id}`)
        }
    } catch (error) {
        res.send('Failed to find the favourites_product ID')
    }
})


favouritesRouter.get('/:product_id/:user_id', async (req, res) => {
    try {
        const product_id = req?.params?.product_id;
        const user_id = req?.params?.user_id;
        const query = { 'product._id': product_id, user_id: user_id };

        console.log(query)

        const product = await collections.favourites.find(query).toArray();
        if (product) {
            res.send(product)
        } else {
            res.send(`Failed to find the product ID :${user_id}`)
        }
    } catch (error) {
        res.send('Failed to find the product ID')
    }
})



favouritesRouter.post('/addFavouriteProduct', async (req, res) => {
    try {
        const product = req.body;
        const result = await collections.favourites.insertOne(product)
        if (result.acknowledged) {
            res.send(`Created a new favourite_product: ID ${result.insertedId}`)
        } else {
            res.send('Failed to create a new  favourite_product')
        }
    } catch (error) {
        console.error(error);
        res.send('Failed to create the favourite_product ID')
    }
})


favouritesRouter.delete('/deleteFavouriteProduct/:id', async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.favourites.deleteOne(query)

        if (result && result.deletedCount) {
            res.send(`We Removed favourite_product with id : ${id}`)
        } else if (!result) {
            res.send(`Failed to remove Removed favourite_product with id : ${id}`)
        } if (!result.deletedCount) {
            res.send(`Failed to find Removed favourite_product with id : ${id}`)
        }

    } catch (error) {
        console.error(error);
        res.send(error.message)
    }
})