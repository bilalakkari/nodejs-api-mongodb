import * as dotenv from 'dotenv';
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './database'
import { productRouter } from './products/products.routes';
import { cartRouter } from './cart/cart.router';
import { userRouter } from './users/users.routes';
import { favouritesRouter } from './favourites/favourites.routes';
import { commentsRouter } from './comments/comments.routes';

dotenv.config();
const { DB_URI } = process.env

if (!DB_URI) {
    console.error('No DB_URI environmet variable')
    process.exit(1);
}

connectToDatabase(DB_URI)
    .then(() => {
        const app = express();
        app.use(cors())
        app.use('/products', productRouter)
        app.use('/cart', cartRouter)
        app.use('/favourites', favouritesRouter)
        app.use('/users', userRouter)
        app.use('/comments', commentsRouter)


        app.listen(5200, () => { console.log('Server is listening on Port 5200') })
    })
    .catch(error => console.error(error))
