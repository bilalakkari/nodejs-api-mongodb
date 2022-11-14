import * as mongodb from 'mongodb'

export class Products {
    title: string = "";
    description: string = "";
    price: number = 0;
    imgUrl: string = "";
    _id?: mongodb.ObjectId;
}