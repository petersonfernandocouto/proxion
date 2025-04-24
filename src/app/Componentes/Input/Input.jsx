import React from "react";
import EditIcon from "../../IMG/edit.svg";
import Image from "next/image";

function Input({ labelText, inputHeight, inputMargin, showIcon }) {
  const inputStyle = {
    border: "2px solid #00ABAD",
    padding: "8px 12px",
    width: "100%",
    borderRadius: "8px",
    height: inputHeight,
    margin: inputMargin,
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
        <input type="text" style={inputStyle} />
        {showIcon && ( // Renderiza a imagem apenas se showIcon for true
          <Image
            src={EditIcon}
            alt="Editar"
            className="absolute top-4 right-3 w-5 h-5"
          />
        )}
      </div>
    </>
  );
}

export default Input;
