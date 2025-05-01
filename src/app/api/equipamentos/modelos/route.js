import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get('modelo');

  console.log("API modelos - categoria recebida:", categoria);
  
  if (!categoria) {
    console.log("API modelos - categoria não especificada");
    return NextResponse.json(
      { error: "Categoria não especificada" },
      { status: 400 }
    );
  }
  
  try {
      const uri = process.env.MONGODB_URI;
      const client = new MongoClient(uri);

      console.log("API modelos - -conectando ao MongoDB...");
  
      await client.connect();
        const database = client.db("ProxionDevDNC");
        const collection = database.collection("Proxion1");
    
        console.log(`API modelos - buscando modelos para categoria "${categoria}"`)

        // Buscar fabricantes únicos para a categoria especificada
        const modelos = await collection.distinct("Modelo", { 
        Categoria: categoria 
      });
    
      console.log("API modelos - modelos encontrados:", modelos);
      
      await client.close();
    
      return NextResponse.json(modelos);
    } catch (error) {
    console.error("Erro ao buscar modelos:", error);
    
    return NextResponse.json(
      { error: "Falha ao buscar modelos" },
      { status: 500 }
    );
  }
}