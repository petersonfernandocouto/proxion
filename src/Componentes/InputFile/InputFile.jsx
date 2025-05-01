import React, { useState } from "react";
import Image from "next/image";
import UploadIcon from "../../app/IMG/Upload.svg";
function InputFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("Arquivo selecionado:", e.target.files[0]);
  };

  return (
    <div className="relative w-[300px] h-[160px] rounded-[8px] border-2 border-dashed border-teal-500 bg-white flex flex-col items-center justify-center cursor-pointer">
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-[300px] h-[160px] opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <Image src={UploadIcon} />
      {selectedFile ? (
        <p className="mt-2 text-sm text-gray-700">{selectedFile.name}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InputFile;
