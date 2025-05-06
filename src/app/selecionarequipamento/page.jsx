"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../../Componentes/Menu/SideBarMenu";
import BGIMG from "../IMG/BG.png";
import Button from "../../Componentes/Button/Button";
import InputSelect from "../../Componentes/InputSelect/InputSelect";
import InputText from "../../Componentes/InputText/InputText";

function SelectEquipment() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tiposEquipamento, setTiposEquipamento] = useState([]);
  const [modelosEquipamento, setModelosEquipamento] = useState([]);
  const [numerosDeSerie, setNumerosDeSerie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [serieSelecionada, setSerieSelecionada] = useState("");
  const [serieManual, setSerieManual] = useState("");

  // Buscar tipos de equipamentos ao carregar a página
  useEffect(() => {
    const fetchTiposEquipamento = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/equipamentos/tipos');
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setTiposEquipamento(data);
      } catch (err) {
        console.error("Erro ao buscar tipos de equipamento:", err);
        setError(err.message);
        // Usando dados estáticos como fallback em caso de erro
        setTiposEquipamento(["Tipo 1", "Tipo 2", "Tipo 3", "Tipo 4", "Tipo 5"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTiposEquipamento();
  }, []);

  // Buscar modelo quando um tipo é selecionado
  useEffect(() => {
    if (!tipoSelecionado) {
      setModelosEquipamento([]);
      return;
    }
    
    const fetchModelos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `/api/equipamentos/modelos?modelo=${encodeURIComponent(tipoSelecionado)}`;
        console.log("Buscando modelos URL:", url); // Debug
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Modelos recebidos:", data); // Debug
        

        // Verificar se temos dados e se é um array
        if (Array.isArray(data) && data.length > 0) {
          setModelosEquipamento(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          // Se não houver erro mas também não houver dados
          setModelosEquipamento([]);
          setError("Nenhum modelo encontrado para este tipo");
        }
      } catch (err) {
        console.error("Erro ao buscar modelos:", err);
        setError(err.message);
        // Usando dados estáticos como fallback em caso de erro
        setModelosEquipamento(["Modelo A", "Modelo B", "Modelo C", "Modelo D", "Modelo E"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModelos();
  }, [tipoSelecionado]);

  // Buscar números de série quando um modelo é selecionado
  useEffect(() => {
    if (!modeloSelecionado || !tipoSelecionado) {
      setNumerosDeSerie([]);
      return;
    }
    
    const fetchNumerosSerie = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `/api/equipamentos/series?tipo=${encodeURIComponent(tipoSelecionado)}&modelo=${encodeURIComponent(modeloSelecionado)}`;
        console.log("Buscando séries URL:", url); // Debug
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Séries recebidas:", data); // Debug
        
        if (Array.isArray(data) && data.length > 0) {
          setNumerosDeSerie(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setNumerosDeSerie([]);
          setError("Nenhum número de série encontrado para este modelo");
        }
      } catch (err) {
        console.error("Erro ao buscar números de série:", err);
        setError(err.message);
        // Usando dados estáticos como fallback
        setNumerosDeSerie(["SN001", "SN002", "SN003", "SN004", "SN005"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNumerosSerie();
  }, [tipoSelecionado, modeloSelecionado]);

  const handleTipoChange = (tipo) => {
    console.log("Tipo selecionado:", tipo);
    setTipoSelecionado(tipo);
    setModeloSelecionado("");
    setSerieSelecionada("");
    setSerieManual("");
  };

  const handleModeloChange = (modelo) => {
    console.log("Modelo selecionado:", modelo);
    setModeloSelecionado(modelo);
    setSerieSelecionada("");
    setSerieManual("");
  };

  const handleSerieChange = (serie) => {
    setSerieSelecionada(serie);
    
  };

  const handleSerieManualChange = (e) => {
    setSerieManual(e.target.value);
    setSerieSelecionada("");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const numeroSerie = serieManual || serieSelecionada;
    
    if (!tipoSelecionado || !modeloSelecionado || !numeroSerie) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    // Aqui você pode navegar para a próxima página ou enviar os dados para o servidor
    console.log("Dados selecionados:", {
      tipo: tipoSelecionado,
      modelo: modeloSelecionado,
      numeroSerie
    });
    
    // Exemplo de navegação para a próxima página
    // router.push(`/equipamentos/${encodeURIComponent(numeroSerie)}`);
  };

  return (
    <div className="relative w-screen h-screen flex bg-gray-100 overflow-hidden">
      {/* Background */}
      <Image
        src={BGIMG}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {!menuOpen && (
        <button
          className="absolute top-4 left-4 z-30 md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}

      <div className="relative w-screen h-screen flex  flex-col items-center p-4 lg:py-8 gap-3">
        <h2 className="text-2xl font-bold mb-3 mt-16 text-[#ffffff]">
          Selecionar Equipamento
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
          <InputSelect
            labelText="Tipo"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={tiposEquipamento}
            value={tipoSelecionado}
            onChange={handleTipoChange}
          />
          <InputSelect
            labelText="Modelo"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={modelosEquipamento}
            value={modeloSelecionado}
            onChange={handleModeloChange}
            disabled={!tipoSelecionado || loading}
          />
          <InputSelect
            labelText="n° série"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={numerosDeSerie}
            value={serieSelecionada}
            onChange={handleSerieChange}
            disabled={!modeloSelecionado || loading}
          />
          <InputText
            inputHeight="50px"
            InputPlaceholder="Digite o n° de serie"
            textStyle="text-center text-xl font-medium text-[#01AAAD]"
            inputMargin="18px 0 0 0"
            value={serieManual}
            onChange={handleSerieManualChange}
            disabled={loading}
          />
          
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mt-2">
              {error}
            </div>
          )}

          
          
          <Button 
            textButton="Selecionar" 
            type="submit"
            disabled={(!tipoSelecionado || !modeloSelecionado || (!serieSelecionada && !serieManual)) || loading}
          />
        </form>
        
        {loading && (
          <div className="mt-4 text-white">
            Carregando...
          </div>
        )}
        
        <Image
          src={Logo}
          alt="Error"
          className="fixed bottom-2 max-w-[100px] mx-auto mt-8 mb-8 lg:hidden"
        />
      </div>
    </div>
  );
}

export default SelectEquipment;