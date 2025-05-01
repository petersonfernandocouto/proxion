import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const serie = searchParams.get('Numero de serie');
  
  if (!serie) {
    return NextResponse.json(
      { error: 'Parâmetro serie é obrigatório' },
      { status: 400 }
    );
  }
  
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json(
        { error: 'URI do MongoDB não configurada' },
        { status: 500 }
      );
    }

    const client = new MongoClient(uri);
    
    await client.connect();
    const database = client.db('ProxionDevDNC');
    const collection = database.collection('Proxion1');
    
    const equipamento = await collection.findOne({ "Numero de serie": serie });
    
    await client.close();
    
    if (!equipamento) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(equipamento);
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar equipamento' },
      { status: 500 }
    );
  }
}