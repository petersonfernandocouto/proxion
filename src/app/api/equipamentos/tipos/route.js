import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('ProxionDevDNC');
    const collection = database.collection('Proxion1');
    
    // Buscar categorias distintas de equipamentos
    const categorias = await collection.distinct('Categoria');
    
    await client.close();
    
    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar tipos de equipamento:', error);
    
    return NextResponse.json(
      { error: 'Erro ao buscar tipos de equipamento' },
      { status: 500 }
    );
  }
}