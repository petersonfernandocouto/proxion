import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');
  const modelo = searchParams.get('modelo');
  
  console.log("API series - parâmetros recebidos:", { tipo, modelo });
  
  if (!tipo || !modelo) {
    console.log("API series - parâmetros tipo e modelo obrigatórios faltando");
    return NextResponse.json(
      { error: 'Parâmetros tipo e modelo são obrigatórios' },
      { status: 400 }
    );
  }
  
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("API series - URI do MongoDB não configurada");
      return NextResponse.json(
        { error: 'URI do MongoDB não configurada' },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri);
    
    console.log("API series - conectando ao MongoDB...");
    await client.connect();
    const database = client.db('ProxionDevDNC');
    const collection = database.collection('Proxion1');
    
    console.log(`API series - buscando números de série para categoria "${tipo}" e modelo "${modelo}"`);
    
    // Buscar números de série para o modelo e categoria específicos
    const equipamentos = await collection.find(
      { Categoria: tipo, Modelo: modelo }
    ).project({ "Numero de serie": 1, _id: 0 }).toArray();
    
    // Extrair os números de série do resultado
    const series = equipamentos.map(equip => equip["Numero de serie"]);
    
    console.log("API series - números de série encontrados:", series);
    
    await client.close();
    
    return NextResponse.json(series);
  } catch (error) {
    console.error('Erro ao buscar números de série:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar números de série' },
      { status: 500 }
    );
  }
}