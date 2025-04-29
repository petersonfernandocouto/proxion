"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import InputSelect from "../InputSelect/InputSelect";
import Button from "../Button/Button";
import logoCLiente1 from "../../IMG/Logo-jnj.png";
import logoCLiente2 from "../../IMG/Logo-jnj.png";
import logoCLiente3 from "../../IMG/Logo-jnj.png";

const dadosHierarquicos = [
  {
    nomeCliente: "Cliente 1",
    logoSrc: logoCLiente1,
    unidades: [
      {
        nomeUnidade: "Unidade A do Cliente 1",
        sublocais: ["Sublocal 1A.1", "Sublocal 1A.2", "Sublocal 1A.3"],
      },
      {
        nomeUnidade: "Unidade B do Cliente 1",
        sublocais: ["Sublocal 1B.1", "Sublocal 1B.2"],
      },
    ],
  },
  {
    nomeCliente: "Cliente 2",
    logoSrc: logoCLiente2,
    unidades: [
      {
        nomeUnidade: "Unidade C do Cliente 2",
        sublocais: [
          "Sublocal 2C.1",
          "Sublocal 2C.2",
          "Sublocal 2C.3",
          "Sublocal 2C.4",
        ],
      },
    ],
  },
  {
    nomeCliente: "Cliente 3",
    logoSrc: logoCLiente3,
    unidades: [
      {
        nomeUnidade: "Unidade D do Cliente 3",
        sublocais: ["Sublocal 3D.1"],
      },
      {
        nomeUnidade: "Unidade E do Cliente 3",
        sublocais: ["Sublocal 3E.1", "Sublocal 3E.2"],
      },
      {
        nomeUnidade: "Unidade F do Cliente 3",
        sublocais: ["Sublocal 3F.1", "Sublocal 3F.2", "Sublocal 3F.3"],
      },
    ],
  },
];

function SelectCompany() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [logoCliente, setLogoCliente] = useState(null);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [sublocalSelecionado, setSublocalSelecionado] = useState("");
  const [opcoesUnidades, setOpcoesUnidades] = useState([]);
  const [opcoesSublocais, setOpcoesSublocais] = useState([]);

  // Atualiza as opções de unidade quando o cliente é selecionado
  useEffect(() => {
    const cliente = dadosHierarquicos.find(
      (c) => c.nomeCliente === clienteSelecionado
    );
    if (cliente) {
      setOpcoesUnidades(cliente.unidades.map((u) => u.nomeUnidade));
      setLogoCliente(cliente.logoSrc);
      setUnidadeSelecionada("");
      setOpcoesSublocais([]);
      setSublocalSelecionado("");
    } else {
      setOpcoesUnidades([]);
      setLogoCliente(null);
      setUnidadeSelecionada("");
      setOpcoesSublocais([]);
      setSublocalSelecionado("");
    }
  }, [clienteSelecionado, dadosHierarquicos]);

  // Atualiza as opções de sublocal quando a unidade é selecionada
  useEffect(() => {
    const cliente = dadosHierarquicos.find(
      (c) => c.nomeCliente === clienteSelecionado
    );
    if (cliente) {
      const unidade = cliente.unidades.find(
        (u) => u.nomeUnidade === unidadeSelecionada
      );
      if (unidade) {
        setOpcoesSublocais(unidade.sublocais);
        // Reseta o sublocal ao mudar de unidade
        setSublocalSelecionado("");
      } else {
        setOpcoesSublocais([]);
        setSublocalSelecionado("");
      }
    } else {
      setOpcoesSublocais([]);
      setSublocalSelecionado("");
    }
  }, [clienteSelecionado, unidadeSelecionada, dadosHierarquicos]);

  const opcoesClientes = dadosHierarquicos.map(
    (cliente) => cliente.nomeCliente
  );

  const handleClienteChange = (cliente) => {
    setClienteSelecionado(cliente);
  };

  const handleUnidadeChange = (unidade) => {
    setUnidadeSelecionada(unidade);
  };

  const handleSublocalChange = (sublocal) => {
    setSublocalSelecionado(sublocal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cliente Selecionado:", clienteSelecionado);
    console.log("Unidade Selecionada:", unidadeSelecionada);
    console.log("Sublocal Selecionado:", sublocalSelecionado);
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
          Selecione a empresa
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
          <InputSelect
            labelText="Cliente"
            inputHeight="50px"
            showIcon
            opcoes={opcoesClientes}
            onChange={handleClienteChange}
            value={clienteSelecionado}
          />
          <InputSelect
            labelText="Unidade"
            inputHeight="50px"
            showIcon
            opcoes={opcoesUnidades}
            onChange={handleUnidadeChange}
            value={unidadeSelecionada}
            disabled={!clienteSelecionado}
          />
          <InputSelect
            labelText="Sublocal"
            inputHeight="50px"
            showIcon
            opcoes={opcoesSublocais}
            onChange={handleSublocalChange}
            value={sublocalSelecionado}
            disabled={!unidadeSelecionada}
          />

          <div className=" bg-white flex justify-center items-center h-[150px] mt-[24px] text-xl font-medium text-[#01AAAD] rounded-[8px]">
            {logoCliente && (
              <Image
                className=""
                src={logoCliente}
                alt={`Logo de ${clienteSelecionado}`}
                width={logoCliente.width}
                height={logoCliente.height}
              />
            )}
          </div>
          <Button
            type="submit"
            textButton="Próximo"
            disabled={!sublocalSelecionado}
          />
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

export default SelectCompany;
