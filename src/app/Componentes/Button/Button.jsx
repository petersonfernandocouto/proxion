import React from "react";

function Button({ textButton }) {
  return (
    <button
      type="submit"
      className="text-[#ffffff] font-semibold text-xl mt-7 bg-[#00ABAD] py-3 rounded-md w-[300px]"
    >
      {textButton}
    </button>
  );
}

export default Button;
