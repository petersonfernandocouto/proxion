"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import avatar from "../../IMG/Avatar.png";
import logo from "../../IMG/LOGOBG.png";
import BGIMG from "../../IMG/BG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";

export default function TelaInicial() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed sm:relative z-20 h-full w-full grid grid-cols-1 sm:grid-cols-[1fr_2fr]">

      {/* Sidebar */}
      <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {!menuOpen && (
        <button
          className="absolute top-4 left-4 z-30 md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}
      {/* Background */}
      <div className="relative w-screen h-screen flex bg-gray-100 overflow-hidden">
        <Image
          src={BGIMG}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
      </div>

    </div>
  );
}
