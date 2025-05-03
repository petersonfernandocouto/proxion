"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import avatar from "../../IMG/Avatar.png";
import logo from "../../IMG/LOGOBG.png";
import BGIMG from "../../IMG/BG.png";
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";

export default function HomeInspection() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const agora = new Date();
    setData(agora.toISOString().split("T")[0]);
    setHora(agora.toTimeString().slice(0, 5));
  }, []);

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
      <div className="absolute inset-0 bg-black/10 z-0" />

      <SideBarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {!menuOpen && (
        <button
          className="absolute top-4 left-4 z-30 md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      )}

      <div className="relative z-10 flex flex-col flex-1 items-center justify-between h-full p-4 text-white max-w-full overflow-y-auto mt-5">
        <div className="flex items-center gap-5 mt-20 md:mt-5">
          <Image
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-[32px] md:text-4xl font-bold">Fulano Silva</p>
            <p className="text-[22px]">Analista</p>
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center mt-0 w-full max-w-xl">
          <div className="text-center w-full">
            <p className="text-white text-[22px] font-semibold">Data</p>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="text-[#00A7B2] px-6 py-3 rounded-md text-[22px] text-center font-semibold shadow mt-2 w-[250px] max-w-xs"
            />
          </div>

          <div className="text-center w-full">
            <p className="text-white text-[22px] font-semibold">
              Horário de Chegada
            </p>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="text-[#00A7B2] px-6 py-3 rounded-md text-[22px] text-center font-semibold shadow mt-2 w-[250px] max-w-xs"
            />
          </div>

          <button className="bg-[#00A7B2] text-white text-[24px] font-semibold px-4 py-3 rounded-md shadow w-[320px] mb-10">
            Iniciar vistoria
          </button>
        </div>

        <div className="mb-12 md:mb-5">
          <Image src={logo} alt="logo" width={180} height={100} />
        </div>
      </div>
    </div>
  );
}
