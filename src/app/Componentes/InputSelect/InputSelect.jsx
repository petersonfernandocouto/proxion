import React, { useState } from "react";
import EditIcon from "../../IMG/edit.svg";
import Image from "next/image";

function InputSelect({
  labelText,
  inputHeight,
  inputMargin,
  showIcon,
  textStyle,
  InputPlaceholder,
  opcoes, // Nova prop para receber a lista de opções
}) {
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickInput = () => {
    setMostrarOpcoes(true);
  };

  const handleSelecionarOpcao = (opcao) => {
    setValorSelecionado(opcao);
    setMostrarOpcoes(false);
  };

  const handleCancelar = () => {
    setMostrarOpcoes(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
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
  };

  return (
    <>
      <label
        htmlFor=""
        className="text-[#ffffff] mt-4 text-xl font-semibold text-center"
      >
        {labelText}
      </label>
      <div className="relative flex flex-col">
        <input
          type="text"
          value={valorSelecionado}
          onClick={handleClickInput}
          readOnly
          style={inputStyle}
          className={textStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={InputPlaceholder}
        />
        {showIcon && (
          <Image
            src={EditIcon}
            alt="Editar"
            className="absolute top-4 right-3 w-5 h-5"
          />
        )}
        {mostrarOpcoes && (
          <div className="fixed flex flex-col justify-center items-center inset-0 bg-[#6aaaada3] z-10 ">
            <div className="flex flex-col justify-center items-center p-2  bg-white shadow rounded-[8px] mt-2 w-[300px] border-[3px] border-[#00ABAD] hover:border-[#959595]">
              <div className="py-2 h-[170px] overflow-y-scroll bg-[#ACE5E7] rounded-[8px] w-full">
                {opcoes.map(
                  (
                    opcao // Use a prop 'opcoes' para renderizar a lista
                  ) => (
                    <button
                      key={opcao}
                      onClick={() => handleSelecionarOpcao(opcao)}
                      className="block px-4 py-2 hover:text-[#266e6f] w-full text-center text-xl font-medium text-[#01AAAD] "
                    >
                      {opcao}
                    </button>
                  )
                )}
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
      </div>
    </>
  );
}

export default InputSelect;
