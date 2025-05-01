"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import LogoCompany from "../../IMG/Logo-jnj.png";

export default function SelectCompanyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar empresas baseado na query
  useEffect(() => {
    const fetchEmpresas = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setEmpresas([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/empresas?q=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const empresasData = Array.isArray(data) ? data : data.empresas || [];
        setEmpresas(data);
      } catch (err) {
        console.error("Erro ao buscar empresas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(() => {
      fetchEmpresas();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Lidar com a mudança na busca do cliente
  const handleClienteSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  // Selecionar uma empresa
  const handleSelectEmpresa = (empresa) => {
    setSelectedEmpresa(empresa);
    setSearchQuery(empresa.Nome);
    setShowDropdown(false);
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
          Selecione a empresa
        </h2>

        <form action="" className="flex flex-col w-[300px] relative">
        <div className="relative">
          <InputText
            labelText="Cliente"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            value={searchQuery}
            onChange={handleClienteSearch}
          />

          {/* Dropdown de resultados da busca */}
          {showDropdown && empresas.length > 0 && (
              <div className="absolute w-full bg-white shadow-lg max-h-[200px] overflow-y-auto z-10 rounded-b-md">
                {empresas.map((empresa) => (
                  <div
                    key={empresa._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectEmpresa(empresa)}
                  >
                    <p className="font-medium">{empresa.Nome}</p>
                    <p className="text-sm text-gray-600">{empresa.Categoria}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Mensagem de carregamento */}
            {loading && (
              <div className="absolute w-full bg-white p-2 text-center">
                Carregando...
              </div>
            )}
          </div>

          <InputText
            labelText="Unidade"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            value={selectedEmpresa?.Fabricante || ""}
            readOnly
          />

          <InputText
            labelText="Sublocal"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            value={selectedEmpresa?.Modelo || ""}
            readOnly
          />

          <div className=" bg-white flex justify-center items-center h-[150px] mt-[24px] text-xl font-medium text-[#01AAAD] rounded-[8px]">
            {selectedEmpresa ? (
              <div className="text-center">
                <p className="font-bold">{selectedEmpresa.Nome}</p>
                <p>Status: {selectedEmpresa.Status}</p>
                <p className="text-sm mt-2">ID: {selectedEmpresa._id}</p>
              </div>
            ) : (
              <Image className="" src={LogoCompany} alt="" />
            )}

          </div>

          <Button 
            textButton="Próximo" 
            disabled={!selectedEmpresa}
          />

        </form>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-2 w-[300px]">
            Erro ao carregar empresas: {error}
          </div>
        )}
        
        <Image
          src={Logo}
          alt="Error"
          className="fixed bottom-2 max-w-[100px] mx-auto mt-8 mb-8  lg:hidden"
        />
      </div>
    </div>
  );
}


