import * as mongodb from 'mongodb'

export class Favourites {
    title: string = "";
    description: string = "";
    price: number = 0;
    imgUrl: string = "";
    _id?: mongodb.ObjectId;
}