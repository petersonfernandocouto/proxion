import { MongoClient } from 'mongodb';

// Configuração de conexão com MongoDB
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // Conectar ao MongoDB
    await client.connect();
    
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    
    const database = client.db("ProxionDevDNC");
    const collection = database.collection("Proxion1");
    
    // Construir a consulta baseada nos parâmetros
    const filter = query 
      ? { 
          $or: [
            { Nome: { $regex: query, $options: 'i' } },
            { Categoria: { $regex: query, $options: 'i' } },
            { Fabricante: { $regex: query, $options: 'i' } }
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
  } finally {
    // Garantir que a conexão seja fechada
    await client.close();
  }
}