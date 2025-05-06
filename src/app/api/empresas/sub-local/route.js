import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cliente = searchParams.get('cliente');
    const unidade = searchParams.get('unidade');
    
    if (!cliente || !unidade) {
      return NextResponse.json(
        { error: 'Parâmetros cliente e unidade são obrigatórios' },
        { status: 400 }
      );
    }
    
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('ProxionDevDNC');
    const collection = database.collection('Proxion2');
    
    // Buscar sub-locais do cliente e unidade específicos
    const subLocais = await collection.distinct('Sub-local', { 
      Cliente: cliente,
      Unidade: unidade 
    });
    
    await client.close();
    
    return NextResponse.json(subLocais);
  } catch (error) {
    console.error('Erro ao buscar sub-locais:', error);
    
    return NextResponse.json(
      { error: 'Erro ao buscar sub-locais' },
      { status: 500 }
    );
  }
}