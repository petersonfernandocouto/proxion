import React from 'react'
import Image from 'next/image'
import Logo from '../../IMG/LOGOBG.png'
import { useId } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from 'next/link';

function Login() {

    const ageInputId = useId();

  return (
    <div className='text-white'>

        <Image src={Logo} alt='Error' className='max-w-[250px] mx-auto mt-8 mb-8' />

        <div className='flex flex-col items-center'>   

            <div className='mb-2'>

                <p className='text-center mb-[5px]'>Usuáio</p>
                <label className="relative">

                    <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" />
                    <input name="firstName" className='bg-[#FFFFFF] border-[2px] border-[#00ABAD] rounded-[10px] py-[8px] pl-10 pr-4 text-black focus:outline-none focus:bg-[#00ABAD] focus:text-white'      
                    >       
                    </input>
                </label>


            </div>

            <div className='mb-7'>

                <p className='text-center mb-[5px]'>Senha</p>
                
                <label className="relative">

                    <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" />

                    <input id={ageInputId} className='bg-[#FFFFFF] border-[2px] border-[#00ABAD] rounded-[10px] py-[8px] pl-10 pr-4 text-black focus:outline-none focus:bg-[#00ABAD] focus:text-white'
                    name="password" type="password" />

                </label>


            </div>


            <Link
            
            href="/Cadastro"
            className='mt-6 w-full max-w-[250px] bg-white text-[#00abae] font-medium py-2 rounded-[10px] shadow-md hover:bg-gray-200 transition text-center'
            >    
                    Login      
            </Link>
            

        </div>

        <div className='text-center my-3'>
        <Link
            
            href="/"
            className=''
            >    
                    Esqueci minha senha      
            </Link>
        </div>
        
        <div className='flex flex-row mb-5 gap-5 justify-center'>

                <p className='font-bold text-[25px]  lg:text-[35px]'>Ferramenta 
                Preventiva</p>

        </div>
            
      
    </div>
  )
}

export default Login
