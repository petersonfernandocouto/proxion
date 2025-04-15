import React from 'react'
import Image from 'next/image'
import Logo from '../../IMG/Logo.png'
import { useId } from 'react'
import { AiOutlineUser } from "react-icons/ai"; // icone
import { IoLockClosedOutline } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";
import { GrGooglePlus } from "react-icons/gr";

function Login() {

    const ageInputId = useId();

  return (
    <div className='text-white'>

        <Image src={Logo} alt='Error' className='max-w-[250px] mx-auto' />

        <p className='text-center text-white mb-5'>Bem-vindo <strong>Proxion</strong> </p>

        <div className='flex flex-col items-center gap-5'>   

            <label className="relative">

                <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xl" />
                <input name="firstName" className='bg-transparent border-[2px] border-white rounded-[15px] py-[8px] pl-10 pr-4 text-white focus:outline-none placeholder-white'
                placeholder='User'
                
                >
                
                
                </input>
            </label>

            <label className="relative">

            <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-xl" />

                <input id={ageInputId} className='bg-transparent border-[2px] border-white rounded-[15px] py-[8px] pl-10 pr-4 text-white focus:outline-none placeholder-white'
                placeholder='Password' name="password" type="password" />
            </label>

            <button className='mt-6 w-full max-w-[250px] bg-white text-[#00abae] font-medium py-2 rounded-[15px] shadow-md hover:bg-gray-200 transition'>
                Sign in
            </button>

        </div>

        <div className='text-center my-5'>
            <strong>Or</strong>
            <p>Login with</p>
        </div>
        
        <div className='flex flex-row mb-5 gap-5 justify-center'>

                <div className='text-[30px] p-[5px] rounded-[50%] bg-[#0761f2] cursor-pointer'>
                    <TiSocialFacebook />
                </div>

                <div className='text-[30px] p-[5px] rounded-[50%] bg-[#272829] cursor-pointer'>
                    <BsTwitterX />
                </div>

                <div className='text-[30px] p-[5px] rounded-[50%] bg-[#d40209] cursor-pointer'>
                    <GrGooglePlus />
                </div>

        </div>
            
      
    </div>
  )
}

export default Login
