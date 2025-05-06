"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import EditIcon from "../../app/IMG/edit.svg";


function InputSelect({
  labelText,
  inputHeight = "50px",
  textStyle,
  InputPlaceholder = "Selecione",
  opcoes = [],
  onChange,
  value = "",
  disabled = false,
  showIcon = false,
}) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickInput = () => {
    if (!disabled) setMostrarOpcoes(true);
  };

  const handleSelecionarOpcao = (opcao) => {
    if (onChange) onChange(opcao);
    setMostrarOpcoes(false);
  };

  const inputStyle = {
    border: isFocused ? "3px solid #00ABAD" : "2px solid #959595",
    padding: "8px 12px",
    width: "300px",
    borderRadius: "8px",
    height: inputHeight,
    outline: "none",
    textAlign: "center",
    backgroundColor: "#ffffff",
    color: "#01AAAD",
    fontSize: "20px",
    fontWeight: "500",
  };

  return (
    <div className="flex flex-col my-2 relative">
      <label className="block text-sm font-medium text-white mb-1">
        {labelText}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onClick={handleClickInput}
          readOnly
          style={inputStyle}
          className={textStyle}
          placeholder={InputPlaceholder}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
        />
        {showIcon && (
          <Image
            src={EditIcon}
            alt="Editar"
            className="absolute top-4 right-3 w-5 h-5"
          />
        )}
      </div>

      {mostrarOpcoes && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#6aaaada3] z-50">
          <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-[8px] w-[300px] border-[3px] border-[#00ABAD]">
            <div className="py-2 max-h-[170px] overflow-y-auto bg-[#ACE5E7] rounded-[8px] w-full">
              {opcoes.map((opcao, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelecionarOpcao(opcao)}
                  className="block px-4 py-2 w-full text-center text-xl font-medium text-[#01AAAD] hover:text-[#266e6f]"
                >
                  {opcao}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-3 w-full">
              <button
                onClick={() => setMostrarOpcoes(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputSelect;
