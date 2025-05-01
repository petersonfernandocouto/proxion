"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import avatar from "../IMG/Avatar.png";
import logo from "../IMG/LOGOBG.png";
import BGIMG from "../IMG/BG.png";
import { Menu, X } from "lucide-react";

import SideBarMenu from "../../Componentes/Menu/SideBarMenu";

export default function PaginaParabens() {

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

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center h-full p-4 text-white max-w-full overflow-y-auto mt-0">
        <div className="flex items-center gap-5 mt-0 md:mt-0">
        <div className="mb-12 md:mb-5">
          <Image src={logo} alt="logo" width={180} height={100} />
        </div>
          
        </div>
      <div className="items-center text-center my-2">
        <p className="text-3xl" >Parabéns !</p>
        <p className="text-3xl"> Vistoria Finalizada</p>
      </div>
      
        <div className="flex flex-col gap-4 items-center mt-0 w-full max-w-xl">
          

        <button
            type="submit"
            className="mt-6  w-60 bg-white text-[#00abae] font-bold py-3 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center"
          >
            Exportar CSV
          </button>

        <button
            type="submit"
            className="mt-6 w-60 bg-white text-[#00abae] font-bold py-3 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center"
          >
            Gerar Relatório
          </button>
        </div>

       
      </div>
    </div>
  );
}
