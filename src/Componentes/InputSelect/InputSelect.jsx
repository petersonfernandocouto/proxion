"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Edit } from "lucide-react";
import EditIcon from "../../app/IMG/edit.svg";
import Image from "next/image";





function InputSelect({
  labelText,
  inputHeight,
  textStyle,

  InputPlaceholder,
  opcoes = [],
  onChange,
  value,
  disabled = false,
}) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickInput = () => {
    if (!disabled) {
      setMostrarOpcoes(true);
    }
  };

  const handleSelecionarOpcao = (opcao) => {
    if (onChange) {
      onChange(opcao);
    }
    setMostrarOpcoes(false);
  };

  const handleCancelar = () => {
    setMostrarOpcoes(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyle = {
    border: isFocused ? "3px solid #00ABAD" : "2px solid #959595",
    padding: "8px 12px",
    width: "300px",
    borderRadius: "8px",
    height: inputHeight,
    margin: inputMargin,
    outline: "none",
    textAlign: "center",
    backgroundColor: "#ffffff",
    color: "#01AAAD",
    fontSize: "20px",
    fontWeight: "500",
  };

  opcoes = [],
  showIcon = false,
  value = "",
  onChange,
  disabled = false
} {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef(null);

  // Atualizar selectedOption quando value mudar
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  // Adicionar log para depurar
  console.log(`InputSelect ${labelText} - opcoes:`, opcoes);
  console.log(`InputSelect ${labelText} - value:`, value);


  return (
    <div className="flex flex-col my-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-[#ffffff] mb-1">
        {labelText}
      </label>

      <div className="relative flex flex-col">
        <input
          type="text"
          value={value}
          onClick={handleClickInput}
          readOnly
          style={inputStyle}
          className={textStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={InputPlaceholder}
          disabled={disabled}
        />
        {showIcon && (
          <Image
            src={EditIcon}
            alt="Editar"
            className="absolute top-4 right-3 w-5 h-5"
          />
        )}
        {mostrarOpcoes && (
          <div className="fixed inset-0 flex justify-center items-center bg-[#6aaaada3] z-10">
            <div className="flex flex-col justify-center items-center p-2  bg-white shadow rounded-[8px] mt-2 w-[300px] border-[3px] border-[#00ABAD] hover:border-[#959595]">
              <div className="py-2 h-[170px] overflow-y-scroll bg-[#ACE5E7] rounded-[8px] w-full">
                {opcoes.map((opcao) => (
                  <button
                    key={opcao}
                    onClick={() => handleSelecionarOpcao(opcao)}
                    className="block px-4 py-2 hover:text-[#266e6f] w-full text-center text-xl font-medium text-[#01AAAD] "
                  >
                    {opcao}
                  </button>
                ))}
              </div>
              <div className="flex justify-end p-2">
                <button
                  onClick={handleCancelar}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setMostrarOpcoes(false)}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

      <div
        className={`flex items-center justify-between px-4 bg-white rounded cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ height: inputHeight }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${textStyle}`}>
          {selectedOption || `Selecione ${labelText}`}
        </span>
        <div className="flex items-center">
          {showIcon && (
            <Edit className="h-5 w-5 text-[#01AAAD] mr-2" />
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#01AAAD]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#01AAAD]" />
          )}
        </div>

      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto top-full">
          <ul className="py-1">
            {opcoes && opcoes.length > 0 ? (
              opcoes.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">
                Nenhuma opção disponível
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default InputSelect;