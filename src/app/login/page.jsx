"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../IMG/LOGOBG.png";
import { useId } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const ageInputId = useId();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  /* Simulação!!! */
  const usuarioValido = "teste";
  const senhaValida = "123456";

  const handleLogin = async (event) => {
    event.preventDefault();

    /* Simulação!!! */
    if (username === usuarioValido && password === senhaValida) {
      console.log("Login simulado com sucesso!");
      alert("Login bem-sucedido!");
      router.push("/telainicial");
    } else {
      console.error("Credenciais inválidas (simulação)");
      alert("Usuário ou senha incorretos.");
    }

    /* Realidade!!! */
    /* 
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push("/HomeInspection");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      alert("Erro ao tentar logar. Tente novamente mais tarde.");
    }
      */
  };

  return (
    <div className="text-white">
      <Image
        src={Logo}
        alt="Error"
        className="max-w-[250px] mx-auto mt-8 mb-8"
      />

      <div className="flex flex-col items-center">
        <form onSubmit={handleLogin} className="w-full max-w-[250px]">
          <div className="mb-2">
            <p className="text-center mb-[5px]">Usuáio</p>
            <label className="relative">
              <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" />
              <input
                type="text"
                name="username"
                className="bg-[#FFFFFF] border-[2px] border-[#00ABAD] rounded-[10px] py-[8px] pl-10 pr-4 text-black focus:outline-none focus:bg-[#00ABAD] focus:text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
          </div>

          <div className="mb-7">
            <p className="text-center mb-[5px]">Senha</p>

            <label className="relative">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" />

              <input
                id={ageInputId}
                className="bg-[#FFFFFF] border-[2px] border-[#00ABAD] rounded-[10px] py-[8px] pl-10 pr-4 text-black focus:outline-none focus:bg-[#00ABAD] focus:text-white"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-white text-[#00abae] font-medium py-2 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center"
          >
            Login
          </button>
        </form>
      </div>

      <div className="text-center my-3">
        <Link href="/" className="">
          Esqueci minha senha
        </Link>
      </div>

      <div className="flex flex-row mb-5 gap-5 justify-center">
        <p className="font-bold text-[25px]  lg:text-[35px]">
          Ferramenta Preventiva
        </p>
      </div>
    </div>
  );
}

export default Login;
