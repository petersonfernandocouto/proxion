import React, { useState } from "react";
import EditIcon from "../../IMG/edit.svg";
import Image from "next/image";
import { Search } from "lucide-react";

function Input({
  labelText,
  inputHeight = "40px",
  inputMargin,
  showIcon = false,
  textStyle = "",
  value = "",
  onChange,
  readOnly = false,
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
    textAlign: "center",
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
      <div className="flex flex-col mb-4 relative">
        <label htmlFor="" className="text-[#ffffff] mt-4 text-xl font-semibold text-center">
          {labelText}
        </label>
        <div className="relative flex flex-col">
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${textStyle}`}
            style={{ 
              height: inputHeight,
              border: readOnly ? "2px solid #959595" : undefined,
              borderRadius: "8px",
              outline: "none",
              textAlign: "center"
            }}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={InputPlaceholder}
          />
          {showIcon && !readOnly && ( // Renderiza a imagem apenas se showIcon for true
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={20} />
            </div>
          )}
        </div>
      </div>
  );
}

export default Input;
