import React, { useState } from "react";
import EditIcon from "../../IMG/edit.svg";
import Image from "next/image";

function Input({
  labelText,
  inputHeight,
  inputMargin,
  showIcon,
  textStyle,
  InputPlaceholder,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    border: isFocused ? "3px solid #00ABAD" : "2px solid #959595",
    padding: "8px 12px",
    width: "300px",
    borderRadius: "8px",
    height: inputHeight,
    margin: inputMargin,
    outline: "none",
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
          style={inputStyle}
          className={textStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={InputPlaceholder}
        />
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
