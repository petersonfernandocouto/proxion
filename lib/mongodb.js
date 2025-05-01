import { MongoClient } from 'mongodb';

// URI de conexão do MongoDB
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

// Opções de conexão
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Cliente MongoDB global
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;