import { MongoClient } from 'mongodb';

// Conexão com MongoDB
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
let client = null;
let clientPromise = null;

// Função para conectar ao MongoDB
async function connectToDatabase() {
  if (clientPromise) return clientPromise;
  
  client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

export async function GET(request) {
  try {
    // Conectar ao MongoDB
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const database = client.db("ProxionDevDNC");
    const collection = database.collection("Proxion2");
    
    // Construir a consulta baseada nos parâmetros
    const filter = query
      ? {
          $or: [
            { Cliente: { $regex: query, $options: 'i' } },
            { Unidade: { $regex: query, $options: 'i' } },
            { "Sub-local": { $regex: query, $options: 'i' } }
          ]
        }
      : {};
    
    // Buscar documentos no MongoDB
    const empresas = await collection.find(filter).limit(20).toArray();
    
    // Retornar os resultados como JSON
    return Response.json({ empresas });
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return Response.json({ error: "Erro ao buscar empresas" }, { status: 500 });
  }
}