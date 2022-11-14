import * as mongodb from 'mongodb'

export interface User {
    username: string;
    pwd: string;
    _id?: mongodb.ObjectId;
}