"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import BGModal from '../../IMG/BGModal.png';

export default function ClientModal({ isOpen, onClose, onSave, clienteEditando }) {
  const [formData, setFormData] = useState({
    cliente: '',
    telefone: '',
    unidade: '',
    cidade: '',
    sublocal: '',
    responsavel: '',
    email: '',
    logo: null,
  });

  useEffect(() => {
    if (clienteEditando) {
      setFormData(clienteEditando);
    } else {
      setFormData({
        cliente: '',
        telefone: '',
        unidade: '',
        cidade: '',
        sublocal: '',
        responsavel: '',
        email: '',
        logo: null,
      });
    }
  }, [clienteEditando, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div 
        className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
        style={{
          backgroundImage: `url(${BGModal.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <button className="absolute top-4 right-4 text-xl text-[#00ABAD]" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold text-center mb-10 text-[#00ABAD]">
          Cadastro de Cliente
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#00ABAD]">Código do Cliente</label>
            <input 
              type="text" 
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              maxLength={3}
              className="w-17 border border-[#00ABAD] text-[#187374] rounded-lg p-2 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#00ABAD]">Telefone</label>
            <input 
              type="text" 
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

                // Aplica a máscara (00) 00000-0000
                if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

                if (value.length > 6) {
                  value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
                } else if (value.length > 2) {
                  value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                  value = value.replace(/^(\d*)/, '($1');
                }

                setFormData({ ...formData, telefone: value });
              }}
              className="w-17 border border-[#00ABAD] text-[#187374] rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#00ABAD]">Código Unidade</label>
            <input 
              type="text" 
              value={formData.unidade}
              onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
              maxLength={3}
              className="w-17 border border-[#00ABAD] text-[#187374] rounded-lg p-2"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-[#00ABAD]">Cidade</label>
            <input 
              type="text" 
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              className="w-full border border-[#00ABAD] text-[#187374] rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#00ABAD]">Código Sublocal</label>
            <input 
              type="text" 
              value={formData.sublocal}
              onChange={(e) => setFormData({ ...formData, sublocal: e.target.value })}
              maxLength={3}
              className="w-18 border border-[#00ABAD] text-[#187374] rounded-lg p-2"
            />
          </div>

          <div className="col span-2">
            <label className="block text-sm font-medium text-[#00ABAD]">Responsável</label>
            <input 
              type="text" 
              value={formData.responsavel}
              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
              className="w-full border border-[#00ABAD] text-[#187374] rounded-lg p-2" 
            />
          </div>

          <div >
            <label className="block text-sm font-medium text-[#00ABAD]">E-mail</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-[#00ABAD] text-[#187374] rounded-lg p-2" 
            />
          </div>

          <div >
            <label className="block text-sm font-medium text-[#00ABAD]">Logo</label>
            <input 
              type="file" 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFormData({ ...formData, logo: e.target.files[0] });
                }
              }} 
              className="w-full border border-[#00ABAD] text-[#187374] rounded-lg p-4 bg-white" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded text-[#00ABAD]">
            Cancelar
          </button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 rounded bg-teal-500 text-white">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}