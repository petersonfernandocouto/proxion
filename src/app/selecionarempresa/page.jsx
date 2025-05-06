"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import { Menu } from "lucide-react";
import SideBarMenu from "../../Componentes/Menu/SideBarMenu";
import BGIMG from "../IMG/BG.png";
import InputSelect from "../../Componentes/InputSelect/InputSelect";
import Button from "../../Componentes/Button/Button";
import LogoCompany from "../IMG/Logo-jnj.png";

export default function SelectCompanyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estados para os dados
  const [clientes, setClientes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [subLocais, setSubLocais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para seleções
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [subLocalSelecionado, setSubLocalSelecionado] = useState("");

  // Buscar clientes ao carregar a página
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/empresas/cliente');
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Clientes recebidos:", data); // Debug
        
        if (Array.isArray(data) && data.length > 0) {
          setClientes(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setClientes([]);
          setError("Nenhum cliente encontrado");
        }
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        setError(err.message);
        // Usando dados estáticos como fallback em caso de erro
        setClientes(["KNV", "JSN"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientes();
  }, []);

  // Buscar unidades quando um cliente é selecionado
  useEffect(() => {
    if (!clienteSelecionado) {
      setUnidades([]);
      return;
    }
    
    const fetchUnidades = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `/api/empresas/cliente/unidade?cliente=${encodeURIComponent(clienteSelecionado)}`;
        console.log("Buscando unidades URL:", url); // Debug
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Unidades recebidas:", data); // Debug
        
        if (Array.isArray(data) && data.length > 0) {
          setUnidades(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setUnidades([]);
          setError("Nenhuma unidade encontrada para este cliente");
        }
      } catch (err) {
        console.error("Erro ao buscar unidades:", err);
        setError(err.message);
        // Usando dados estáticos como fallback em caso de erro
        setUnidades(["SJC"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUnidades();
  }, [clienteSelecionado]);

  // Buscar sublocais quando um cliente e unidade são selecionados
  useEffect(() => {
    if (!clienteSelecionado || !unidadeSelecionada) {
      setSubLocais([]);
      return;
    }
    
    const fetchSubLocais = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = `/api/empresas/cliente/unidade/sub-local?cliente=${encodeURIComponent(clienteSelecionado)}&unidade=${encodeURIComponent(unidadeSelecionada)}`;
        console.log("Buscando sublocais URL:", url); // Debug
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Sublocais recebidos:", data); // Debug
        
        if (Array.isArray(data) && data.length > 0) {
          setSubLocais(data);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          setSubLocais([]);
          setError("Nenhum sublocal encontrado para esta unidade");
        }
      } catch (err) {
        console.error("Erro ao buscar sublocais:", err);
        setError(err.message);
        // Usando dados estáticos como fallback em caso de erro
        setSubLocais(["DPA", "PRD", "NAM", "OTC"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubLocais();
  }, [clienteSelecionado, unidadeSelecionada]);

  const handleClienteChange = (cliente) => {
    console.log("Cliente selecionado:", cliente);
    setClienteSelecionado(cliente);
    setUnidadeSelecionada("");
    setSubLocalSelecionado("");
  };

  const handleUnidadeChange = (unidade) => {
    console.log("Unidade selecionada:", unidade);
    setUnidadeSelecionada(unidade);
    setSubLocalSelecionado("");
  };

  const handleSubLocalChange = (subLocal) => {
    console.log("Sublocal selecionado:", subLocal);
    setSubLocalSelecionado(subLocal);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!clienteSelecionado || !unidadeSelecionada || !subLocalSelecionado) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    // Aqui você pode navegar para a próxima página ou enviar os dados
    console.log("Empresa selecionada:", {
      cliente: clienteSelecionado,
      unidade: unidadeSelecionada,
      subLocal: subLocalSelecionado
    });
    
    // Exemplo de navegação para a próxima página
    // router.push('/proxima-pagina');
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

      <div className="relative w-screen h-screen flex flex-col items-center p-4 lg:py-8 gap-3">
        <h2 className="text-2xl font-bold mb-3 mt-16 text-[#ffffff]">
          Selecione a empresa
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
          <InputSelect
            labelText="Cliente"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={clientes}
            value={clienteSelecionado}
            onChange={handleClienteChange}
            disabled={loading}
          />
          
          <InputSelect
            labelText="Unidade"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={unidades}
            value={unidadeSelecionada}
            onChange={handleUnidadeChange}
            disabled={!clienteSelecionado || loading}
          />
          
          <InputSelect
            labelText="Sublocal"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={subLocais}
            value={subLocalSelecionado}
            onChange={handleSubLocalChange}
            disabled={!unidadeSelecionada || loading}
          />

          <div className="bg-white flex justify-center items-center h-[150px] mt-[24px] text-xl font-medium text-[#01AAAD] rounded-[8px]">
            {clienteSelecionado ? (
              <div className="text-center">
                <p className="font-bold">{clienteSelecionado}</p>
                {unidadeSelecionada && <p>Unidade: {unidadeSelecionada}</p>}
                {subLocalSelecionado && <p>Sublocal: {subLocalSelecionado}</p>}
              </div>
            ) : (
              <Image className="" src={LogoCompany} alt="" />
            )}
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mt-2">
              {error}
            </div>
          )}
          
          <Button 
            textButton="Próximo" 
            type="submit"
            disabled={(!clienteSelecionado || !unidadeSelecionada || !subLocalSelecionado) || loading}
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