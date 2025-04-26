"use client";

import {useState} from "react"
import Image from 'next/image'
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import LogoJNJ from '../../IMG/Logo-jnj.png'
import BGIMG from "../../IMG/BG.png";

export default function RegisteredCompanies() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const empresas = [
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "Sâo José dos Campos",
            logo: {LogoJNJ},
        },

    ];

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

                <div className="min-h-screen  p-8 text-white z-10">
                    <h1 className="text-[34px] font-bold mb-15">Empresas Cadastradas</h1>

                    <div className="flex gap-4 mb-6">
                        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
                            + Adicionar
                        </button>
                        <button className="bg-[#00ABAD] hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
                            Editar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Remover
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Filtro
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow-lg"> 
                      <table className="min-w-full text-gray-800">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-4 text-left">Cliente</th>
                                <th className="p-4 text-left">Unidade</th>
                                <th className="p-4 text-left">Sublocal</th>
                                <th className="p-4 text-left">Responsável</th>
                                <th className="p-4 text-left">E-mail</th>
                                <th className="p-4 text-left">Telefone</th>
                                <th className="p-4 text-left">Cidade</th>
                                <th className="p-4 text-left">Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map((empresa, index) => (
                                <tr 
                                key={index}
                                className={`border-t ${
                                    selectedRow === index ? "bg-teal-100" : "hover:-bg-gray-100"
                                }`}
                                >
                                <td className="p-4">
                                    <input 
                                    type="radio" 
                                    name="selected"
                                    checked={selectedRow === index}
                                    onChange={() => setSelectedRow(index)}
                                    /> 
                                <span className="ml-2"> {empresa.cliente}</span></td>
                                <td className="p-4">{empresa.unidade}</td>
                                <td className="p-4">{empresa.sublocal}</td>
                                <td className="p-4">{empresa.responsavel}</td>
                                <td className="p-4">{empresa.email}</td>
                                <td className="p-4">{empresa.telefone}</td>
                                <td className="p-4">{empresa.cidade}</td>
                                <td className="p-4"> <img src={empresa.logo} alt="Logo" className="h-8" /></td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                </div>
        </div>                      
    )
}