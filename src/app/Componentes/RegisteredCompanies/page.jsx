"use client";

import {useState} from "react"
import Image from 'next/image'
import { Menu, X } from "lucide-react";
import SideBarMenu from "../Menu/SideBarMenu";
import LogoJNJ from '../../IMG/Logo-jnj.png'
import BGIMG from "../../IMG/BG.png";
import Pen from '../../IMG/Pen.svg';
import Filter from '../../IMG/filter.svg';
import ClienteModal from '../Modal/modalCompanies'

export default function RegisteredCompanies() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleAdicionar = () => {
        setClienteEditando(null);
        setModalOpen(true);
      };
    
      const handleEditar = (cliente) => {
        setClienteEditando(cliente);
        setModalOpen(true);
      };
    
      const handleSalvar = (novoCliente) => {
        if (clienteEditando) {
      
          setClientes(clientes.map(c => c.codigoCliente === clienteEditando.codigoCliente ? novoCliente : c));
        } else {
         
          setClientes([...clientes, novoCliente]);
        }
        setModalOpen(false);
      };

    const empresas = [
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
        },
        {
            cliente: "JNJ",
            unidade: "GRU",
            sublocal: "CDD",
            responsavel: "João Silva",
            email: "joao.silva@jnj.com.br",
            telefone: "(12) 99999-9999",
            cidade: "São José dos Campos",
            logo: LogoJNJ,
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

                <div className="min-h-screen  p-8 text-white z-10 mt-7 ">
                    <h1 className="mb-auto text-[30px] font-bold ">Empresas Cadastradas</h1>

                    <div className="flex gap-4 mb-10 mt-10">
                        <button onClick={handleAdicionar} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
                            + Adicionar
                        </button>
                        <button 
                            onClick={() => {
                                if (selectedRow !== null) {
                                    handleEditar((clientes.length > 0 ? clientes : empresas)[selectedRow]);
                                }
                            }}
                        className="flex items-center gap-0 bg-[#2C7172] hover:bg-teal-600 border border-white text-white font-semibold py-2 px-2 rounded">
                            <Image
                                src={Pen}
                                alt="Pen"
                                width={30}
                                height={30}
                                className="h-8 w-8"
                            />
                            Editar
                        </button>
                        <button className="bg-[#2C7172] hover:bg-teal-600 border border-white text-white font-semibold py-2 px-4 rounded">
                             X  Remover
                        </button>
                        <button className="flex items-center gap-0 bg-[#2C7172] hover:bg-teal-600 border border-white text-white font-semibold py-2 px-2 rounded"> 
                            <Image
                                src={Filter}
                                alt="Filter"
                                width={50}
                                height={50}
                                className="h-8 w-6"
                            />
                            Filtro
                            </button>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow-lg overflow-hidden"> 
                        <div className="overflow-y-auto">
                            <table className="min-w-full text-gray-800">
                                <thead className="bg-gray-200 sticky top-0 z-10 pb-4">
                                    <tr>
                                        <th className="p-4 text-left text-[#2C7172]">Cliente</th>
                                        <th className="p-4 text-left text-[#2C7172]">Unidade</th>
                                        <th className="p-4 text-left text-[#2C7172]">Sublocal</th>
                                        <th className="p-4 text-left text-[#2C7172]">Responsável</th>
                                        <th className="p-4 text-left text-[#2C7172]">E-mail</th>
                                        <th className="p-4 text-left text-[#2C7172]">Telefone</th>
                                        <th className="p-4 text-left text-[#2C7172]">Cidade</th>
                                        <th className="p-4 text-left text-[#2C7172]">Logo</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                            <table className="min-w-full text-gray-800">
                                <tbody>
                                    {(clientes.length > 0 ? clientes : empresas).map((empresa, index) => (
                                        <tr 
                                        key={index}
                                        className={`border-t ${
                                            selectedRow === index ? "bg-teal-100" : "hover:-bg-gray-50"
                                        }`}
                                        >
                                        <td className="p-4">
                                            <input 
                                            type="radio" 
                                            name="selected"
                                            checked={selectedRow === index}
                                            onChange={() => setSelectedRow(index)}
                                            /> 
                                            <span className="ml-2 text-[#2C7172]"> {empresa.cliente}</span></td>
                                            <td className="p-4 text-[#2C7172]">{empresa.unidade}</td>
                                            <td className="p-4 text-[#2C7172]">{empresa.sublocal}</td>
                                            <td className="p-4 text-[#2C7172]">{empresa.responsavel}</td>
                                            <td className="p-4 text-[#2C7172]">{empresa.email}</td>
                                            <td className="p-4 text-[#2C7172]">{empresa.telefone}</td>
                                            <td className="p-4 text-[#2C7172]">{empresa.cidade}</td>
                                            <td className="p-4 text-[#2C7172]"> 
                                                <Image
                                                    src={empresa.logo}
                                                    alt="Logo"
                                                    width={50}
                                                    height={50}
                                                    className="h-8 w-auto"
                                                />
                                            </td>
                                        </tr>
                                        ))}
                                        </tbody>
                                        </table>
                                
                        </div>
                    </div>
                </div>

                {modalOpen && (
                    <ClienteModal
                        clienteEditando={clienteEditando}
                        isOpen={modalOpen}
                        onSave={handleSalvar}
                        onClose={() => setModalOpen(false)}
                    />
                )}
    </div> 

    )
}