"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import LogoCompany from "../../IMG/Logo-jnj.png";

function SelectCompany() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <form action="" className="flex flex-col w-[300px]">
          <InputText
            labelText="Tipo"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <InputText
            labelText="Modelo"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <InputText
            labelText="n° série"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <InputText
            inputHeight="50px"
            InputPlaceholder="Digite o n° de serie"
            textStyle="text-center text-xl font-medium text-[#01AAAD]"
            inputMargin="18px 0 0 0"
          ></InputText>
          <Button textButton="Selecionar" />
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
