import * as mongodb from "mongodb";
import { Products } from "./products/products";
import { Cart } from "./cart/cart";
import { Favourites } from "./favourites/favourites";
import { User } from "./users/users";
import { Comments } from "./comments/comments";

export const collections: {
    products?: mongodb.Collection<Products>;
    cart?: mongodb.Collection<Cart>;
    favourites?: mongodb.Collection<Favourites>;
    users?: mongodb.Collection<User>;
    comments?: mongodb.Collection<Comments>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("test");
    await applySchemaValidation_Product(db);
    await applySchemaValidation_Cart(db);
    await applySchemaValidation_Favourite(db);
    await applySchemaValidation_User(db);
    await applySchemaValidation_Comment(db);

    const productsCollection = db.collection<Products>("products");
    collections.products = productsCollection;

    const cartCollection = db.collection<Cart>("cart");
    collections.cart = cartCollection;

    const favouritesCollection = db.collection<Favourites>("favourites");
    collections.favourites = favouritesCollection;

    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;

    const commentsCollection = db.collection<Comments>("comments");
    collections.comments = commentsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way

async function applySchemaValidation_Product(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "price", "imgUrl"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                },
                price: {
                    bsonType: "number",
                    description: "'price' is required and is a number",
                },
                imgUrl: {
                    bsonType: "string",
                    description: "'imgUrl' is required and is a string",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "products",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("products", { validator: jsonSchema });
        }
    });
}

async function applySchemaValidation_Cart(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "product", "quantity"],
            additionalProperties: false,
            properties: {
                _id: {},
                user_id: {
                    bsonType: "string",
                    description: "'user_id' is required and is a number",
                },
                product: {
                    bsonType: "object",
                    description: "'product_id' is required and is a number",
                },
                quantity: {
                    bsonType: "number",
                    description: "'quantity' is required and is a number",
                }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "cart",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("cart", { validator: jsonSchema });
        }
    });
}

async function applySchemaValidation_Favourite(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "product"],
            additionalProperties: false,
            properties: {
                _id: {},
                user_id: {
                    bsonType: "string",
                    description: "'user_id' is required and is a number",
                },
                product: {
                    bsonType: "object",
                    description: "'product_id' is required and is a number",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "favourites",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("favourites", { validator: jsonSchema });
        }
    });
}

async function applySchemaValidation_User(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "pwd"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a number",
                },
                pwd: {
                    bsonType: "string",
                    description: "'pwd' is required and is a number",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", { validator: jsonSchema });
        }
    });
}

async function applySchemaValidation_Comment(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["user", "comment", "product_id", "stars"],
            additionalProperties: false,
            properties: {
                _id: {},
                user: {
                    bsonType: "object",
                    description: "'user' is required and is a object",
                },
                comment: {
                    bsonType: "string",
                    description: "'comment' is required and is a string",
                },
                product_id: {
                    bsonType: "string",
                    description: "'product_id' is required and is a string",
                },
                stars: {
                    bsonType: "number",
                    description: "'stars' is required and is a number",
                }
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", { validator: jsonSchema });
        }
    });
}