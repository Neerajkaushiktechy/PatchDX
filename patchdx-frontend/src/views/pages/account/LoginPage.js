import React, { useEffect } from 'react'
import logo from '../../../assets/images/logo.png'
import vectorTop from '../../../assets/images/vector1.png'
import vectorBottom from '../../../assets/images/vector2.png'
import LoginForm from '../../forms/LoginForm';

export default function LoginPage() {

  return (
    <>
      <div className="login flex items-center justify-center h-screen relative p-8">
        <div className="block xl:flex items-center justify-center">
          <img src={vectorTop} alt="PatchDx" className="absolute top-0 left-0"></img>
          <img src={logo} alt="PatchDx" className="mx-auto xl:mr-[132px] w-[300px] xl:w-[560px] 2xl:w-[820px] mb-8 xl:mb-0"></img>
          <div className="bg-primary rounded-2xl p-6 md:p-10 min-w-full md:min-w-[575px]">
            <h1 className="text-white text-2xl md:text-[42px] font-semibold mb-[10px]">Welcome Back!</h1>
            <p className="text-white text-sm md:text-xl mb-[30px] md:mb-[42px]">Enter the required field to access your account.</p>
            <LoginForm />
          </div>
          <img src={vectorBottom} alt="PatchDx" className="absolute bottom-0 right-0"></img>
        </div>
      </div></>
  )
}