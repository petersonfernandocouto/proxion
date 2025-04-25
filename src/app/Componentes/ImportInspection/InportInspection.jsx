"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../IMG/LOGOBG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import BGIMG from "../../IMG/BG.png";
import InputFile from "../InputFile/InputFile";
import Button from "../Button/Button";

function InportInspection() {
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
      <div className="justify-between text-center relative w-screen h-screen flex  flex-col items-center py-4 lg:py-16 px-10  gap-3">
        <h2 className="w-64 text-2xl font-bold mb-3 mt-16 lg:mt-0 text-[#ffffff]">
          Faça a importação da última vistoria
        </h2>
        <form
          action=""
          className="flex flex-col w-[300px] justify-center items-center lg:justify-between lg:h-[370px]"
        >
          <InputFile />
          <Button textButton="Próximo" />
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

export default InportInspection;
