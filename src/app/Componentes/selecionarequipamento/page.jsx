"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import Button from "../Button/Button";
import InputSelect from "../InputSelect/InputSelect";
import InputText from "../InputText/InputText";

// Supondo que você tenha uma estrutura de dados como esta
const equipamentosData = [
  {
    tipo: "Tipo A",
    modelos: ["Modelo A1", "Modelo A2"],
    series: {
      "Modelo A1": ["SA1-001", "SA1-002"],
      "Modelo A2": ["SA2-001", "SA2-002", "SA2-003"],
    },
  },
  {
    tipo: "Tipo B",
    modelos: ["Modelo B1", "Modelo B2", "Modelo B3"],
    series: {
      "Modelo B1": ["SB1-001"],
      "Modelo B2": ["SB2-001", "SB2-002"],
      "Modelo B3": ["SB3-001", "SB3-002", "SB3-003", "SB3-004"],
    },
  },
];

function SelectEquipment() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [serieSelecionado, setSerieSelecionado] = useState("");
  const [opcoesModelos, setOpcoesModelos] = useState([]);
  const [opcoesSeries, setOpcoesSeries] = useState([]);

  // Atualiza as opções de modelo quando o tipo é selecionado
  useEffect(() => {
    const equipamento = equipamentosData.find(
      (eq) => eq.tipo === tipoSelecionado
    );
    if (equipamento) {
      setOpcoesModelos(equipamento.modelos);
      setModeloSelecionado(""); // Reseta o modelo ao mudar o tipo
      setOpcoesSeries([]); // Reseta as séries ao mudar o tipo
      setSerieSelecionado(""); // Reseta a série ao mudar o tipo
    } else {
      setOpcoesModelos([]);
      setModeloSelecionado("");
      setOpcoesSeries([]);
      setSerieSelecionado("");
    }
  }, [tipoSelecionado]);

  // Atualiza as opções de número de série quando o modelo é selecionado
  useEffect(() => {
    const equipamento = equipamentosData.find(
      (eq) => eq.tipo === tipoSelecionado
    );
    if (equipamento && modeloSelecionado) {
      setOpcoesSeries(equipamento.series[modeloSelecionado] || []);
      setSerieSelecionado(""); // Reseta a série ao mudar o modelo
    } else {
      setOpcoesSeries([]);
      setSerieSelecionado("");
    }
  }, [tipoSelecionado, modeloSelecionado]);

  const opcoesTipos = equipamentosData.map((eq) => eq.tipo);

  const handleTipoChange = (novoTipo) => {
    setTipoSelecionado(novoTipo);
  };

  const handleModeloChange = (novoModelo) => {
    setModeloSelecionado(novoModelo);
  };

  const handleSerieChange = (novoSerie) => {
    setSerieSelecionado(novoSerie);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Tipo Selecionado:", tipoSelecionado);
    console.log("Modelo Selecionado:", modeloSelecionado);
    console.log("Número de Série (Select):", serieSelecionado);
    // Aqui você pode adicionar a lógica para o próximo passo
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
            opcoes={opcoesTipos}
            value={tipoSelecionado}
            onChange={handleTipoChange}
          />
          <InputSelect
            labelText="Modelo"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={opcoesModelos}
            value={modeloSelecionado}
            onChange={handleModeloChange}
            disabled={!tipoSelecionado}
          />
          <InputSelect
            labelText="n° série"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
            opcoes={opcoesSeries}
            value={serieSelecionado}
            onChange={handleSerieChange}
            disabled={!modeloSelecionado}
          />
          <InputText
            inputHeight="50px"
            InputPlaceholder="Digite o n° de serie"
            textStyle="text-center text-xl font-medium text-[#01AAAD]"
            inputMargin="18px 0 0 0"
          ></InputText>
          <Button type="submit" textButton="Selecionar" />
        </form>
        <Image
          src={Logo}
          alt="Error"
          className="fixed bottom-2 max-w-[100px] mx-auto mt-8 mb-8  lg:hidden"
        />
      </div>
    </div>
  );
}

export default SelectEquipment;
