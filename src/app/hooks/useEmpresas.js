import { useState, useEffect } from 'react';

export default function useEmpresas(searchQuery = '') {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Construir URL com parâmetros de busca se houver
        const url = searchQuery
          ? `/api/empresas?query=${encodeURIComponent(searchQuery)}`
          : '/api/empresas';
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar empresas');
        }
        
        const data = await response.json();
        setEmpresas(data.empresas);
      } catch (err) {
        console.error('Erro:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmpresas();
  }, [searchQuery]);
  
  return { empresas, loading, error };
}