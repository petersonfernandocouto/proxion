"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import Input from "../Input/Input";
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
      <div className="relative w-screen h-screen flex  flex-col items-center p-4 gap-3">
        <h2 className="text-2xl font-bold mb-3 mt-16 text-[#ffffff]">
          Selecione a empresa
        </h2>
        <form action="" className="flex flex-col w-[300px]">
          <Input
            labelText="Cliente"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <Input
            labelText="Unidade"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <Input
            labelText="Sublocal"
            inputHeight="50px"
            showIcon
            textStyle="text-xl font-medium text-[#01AAAD]"
          />
          <div className=" bg-white flex justify-center items-center h-[150px] mt-[24px] text-xl font-medium text-[#01AAAD] rounded-[8px]">
            <Image className="" src={LogoCompany} alt="" />
          </div>
          <Button textButton="Próximo" />
        </form>
        <Image
          src={Logo}
          alt="Error"
          className="max-w-[100px] mx-auto mt-8 mb-8  lg:hidden"
        />
      </div>
    </div>
  );
}

export default SelectCompany;
