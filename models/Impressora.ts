import mongoose from 'mongoose';

const ImpressoraSchema = new mongoose.Schema({
  Nome: { type: String },
  NumeroDeSerie: { type: String },
  Categoria: { type: String },
  Fabricante: { type: String },
  Modelo: { type: String },
  Status: { type: String },
  UtilizadoPor: { type: String },
});

export default mongoose.models.Impressora || mongoose.model('Impressora', ImpressoraSchema);