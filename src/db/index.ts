import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

let cachedClient: MongoClient | null = null;

export async function getClient() {
    if (!cachedClient) {
        cachedClient = new MongoClient(MONGODB_URI, {
            maxPoolSize: 500,
        });
        try {
            await cachedClient.connect();
            console.log("Connected to MongoDB");
        } catch {
            console.log("Error Connecting to MongoDB");
        }
    }
    return cachedClient;
}
