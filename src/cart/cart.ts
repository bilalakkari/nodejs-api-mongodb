import * as mongodb from 'mongodb';

export class Cart {
    user_id: string = '';
    product: object;
    quantity: number = 0;
    _id?: mongodb.ObjectId;
}