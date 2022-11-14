import * as mongodb from 'mongodb'

export class Comments {
    user: object;
    comment: string;
    product_id: string = '';
    stars: number = 0;
    _id?: mongodb.ObjectId;
}