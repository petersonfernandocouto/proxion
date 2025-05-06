import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cliente = searchParams.get('cliente');
    
    if (!cliente) {
      return NextResponse.json(
        { error: 'Parâmetro cliente é obrigatório' },
        { status: 400 }
      );
    }
    
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('ProxionDevDNC');
    const collection = database.collection('Proxion2');
    
    // Buscar unidades do cliente específico
    const unidades = await collection.distinct('Unidade', { Cliente: cliente });
    
    await client.close();
    
    return NextResponse.json(unidades);
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
    
    return NextResponse.json(
      { error: 'Erro ao buscar unidades' },
      { status: 500 }
    );
  }
}