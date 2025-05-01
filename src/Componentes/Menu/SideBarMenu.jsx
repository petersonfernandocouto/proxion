"use client";

import Image from "next/image";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import LogoTransparente from "../../app/IMG/LogoFTransp.png";

function SidebarMenu({ menuOpen, setMenuOpen }) {
  return (
    <div
      className={`fixed md:relative z-20 h-full bg-[#D9D9D9] text-black p-10 w-64 transition-transform duration-300 ease-in-out
      ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-start mb-10">
        <Image src={LogoTransparente} alt="Logo" width={120} height={60} />
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-10 text-sm font-semibold">
        <div>
          <h2 className="text-gray-600 font-bold">Vistoria</h2>
          <ul className="ml-4 space-y-1 mt-1 text-gray-600">
            <li>
              <a href="/iniciarvistoria" className="hover:text-[#00A7B2]">
                Iniciar Vistoria
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Retomar Vistoria
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Reiniciar Vistoria
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Importar Vistoria
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Selecionar Empresa
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Selecionar Equipamento
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Lista de Equipamentos
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Finalizar Vistoria
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">Cadastro</h2>
          <ul className="ml-4 space-y-1 mt-1 text-gray-600">
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Cadastro de Analista
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Cadastro de Clientes
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Cadastro de Equipamento
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-[#00A7B2]">
                Cadastro de Defeito
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">
            <a href="/" className="hover:text-[#00A7B2]">
              Permissões
            </a>
          </h2>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold">
            <a href="/" className="hover:text-[#00A7B2]">
              Alterar Perfil
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}

SidebarMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};

export default SidebarMenu;
