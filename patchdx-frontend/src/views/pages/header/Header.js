import React from 'react';
import { useNavigate } from "react-router-dom";
import bellIcon from '../../../assets/images/bell.svg'
import searchIcon from '../../../assets/images/search.svg'
import { Dropdown } from 'flowbite-react'
import avatarProfile from '../../../assets/images/avatar.png'
import { LogoutUser } from '../../../service/account/LoginService';
import { FiMenu } from "react-icons/fi";


function Header({title}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutUser();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/clinic/my-account");
  };
  
  return (
    <div className='flex items-center justify-between px-[30px] py-5 lg:py-7'>
      <div className="flex items-center">
      <FiMenu className="inline-block mr-2 lg:hidden" />
      <span className='text-secondary-text font-semibold text-base sm:text-xl'>{title}</span>
      </div>
      <div className='flex items-center'>
        <img src={bellIcon} alt="patchDX" className="border-r border-outline pr-3 sm:pr-5 mr-3 sm:mr-5 w-7 sm:w-auto h-7 sm:h-auto"></img>
        <img src={searchIcon} alt="patchDX" className="border-r border-outline pr-3 sm:pr-5 mr-3 sm:mr-5 w-7 sm:w-auto h-7 sm:h-auto"></img>
        <Dropdown arrowIcon={false} label={<img src={avatarProfile} className="cursor-pointer w-7 sm:w-auto h-7 sm:h-auto" alt='patchDX' />} inline={true} dismissOnClick={false} className="shadow-none">
          <Dropdown.Item>My Account</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} className="text-text-danger">Log out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header