import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { Accordion } from "flowbite-react";
import { FaUserCog, FaFlask, FaCog } from "react-icons/fa";
import Header from '../views/pages/header/Header'



function SidebarLayout() {
  let location = useLocation();
  return (
    <React.Fragment>
      <div className='flex'>
        <div className='px-5 2xl:px-[30px] py-10 md:w-[320px] 2xl:w-[360px] shadow-xl bg-white fixed h-screen'>
          <img src={logo} alt='patchDX' className='w-[148px] 2xl:w-[198px]  mb-[60px] mx-auto'></img>
          <Accordion className="border-none" collapseAll>
            <Accordion.Panel>
              <div className={`${location.pathname === '/clinic/register-new-patient' || location.pathname.includes('send-questionnaire') || location.pathname.includes('start-new-patch-order') ? 'active-sidebar-menu' : ''}`}>
                <NavLink to="register-new-patient">
                  <Accordion.Title className="bg-transparent border-none hover:bg-transparent focus:ring-opacity-0">
                    <div className='flex items-center'>
                      <FaUserCog className="menu-icon text-xl mr-4" />
                      <span className="menu-name text-base font-semibold text-secondary-text">New Patient</span>
                    </div>
                  </Accordion.Title>
                </NavLink>
                <Accordion.Content className="border-none pt-1 sidebar-menu-items">
                  <ul>
                    <li><NavLink to="register-new-patient">Register New Patient</NavLink></li>
                    <li><NavLink to="send-questionnaire">Send Questionnaire</NavLink></li>
                    <li><NavLink to="start-new-patch-order">Start new patch order</NavLink></li>
                  </ul>
                </Accordion.Content>
              </div>
            </Accordion.Panel>
            <Accordion.Panel>
              <div className={`${location.pathname === '/clinic/patient' || location.pathname === '/clinic/patient-info' ? 'active-sidebar-menu' : ''}`}>
                <NavLink to="patient">
                  <Accordion.Title className="bg-transparent border-none accordian-toggle hover:bg-transparent focus:ring-opacity-0">
                    <div className='flex items-center'>
                      <FaUserCog className="menu-icon text-xl mr-4" />
                      <span className="menu-name text-base font-semibold text-secondary-text">Review Patient Data</span>
                    </div>
                  </Accordion.Title>
                </NavLink>
              </div>
            </Accordion.Panel>
            <Accordion.Panel>
              <div className={`${location.pathname === '/clinic/enter-patch-test-results' || location.pathname === '/clinic/enter-patch-results' || location.pathname === '/clinic/summary-letter' || location.pathname === '/clinic/generate-summary-letter' ? 'active-sidebar-menu' : ''}`}>
                <NavLink to="enter-patch-test-results">
                  <Accordion.Title className="bg-transparent border-none hover:bg-transparent focus:ring-opacity-0">
                    <div className='flex items-center'>
                      <FaFlask className="menu-icon text-xl mr-4" />
                      <span className="menu-name text-base font-semibold text-secondary-text">Start Patch Test Visit</span>
                    </div>
                  </Accordion.Title>
                </NavLink>
                <Accordion.Content className="border-none pt-[10px] sidebar-menu-items">
                  <ul>
                    <li><NavLink to="enter-patch-test-results">Enter Patch Test Results</NavLink></li>
                    <li><NavLink to="summary-letter">Generate Summary Letter</NavLink></li>
                  </ul>
                </Accordion.Content>
              </div>
            </Accordion.Panel>
            <Accordion.Panel>
              <div className={`${location.pathname === '/clinic/questionnaire-list' || location.pathname === '/clinic/questionnaire-builder/' || location.pathname === '/clinic/letter-builder/' || location.pathname === '/clinic/letter-builder-list' || location.pathname === '/clinic/letter-builder' || location.pathname === '/clinic/my-account' ? 'active-sidebar-menu' : ''}`}>
                <NavLink to="questionnaire-list">
                  <Accordion.Title className="bg-transparent border-none hover:bg-transparent focus:ring-opacity-0">
                    <div className='flex items-center'>
                      <FaCog className="menu-icon text-xl mr-4" />
                      <span className="menu-name text-base font-semibold text-secondary-text">Settings</span>
                    </div>
                  </Accordion.Title>
                </NavLink>
                <Accordion.Content className="border-none pt-[10px] sidebar-menu-items">
                  <ul>
                    <li><NavLink to="questionnaire-list">Questionnaire Builder</NavLink></li>
                    <li><NavLink to="letter-builder-list">Letter Builder</NavLink></li>
                    <li><NavLink to="my-account">Allergen Summary</NavLink></li>
                    <li><NavLink to="my-account">My Profile</NavLink></li>
                  </ul>
                </Accordion.Content>
              </div>
            </Accordion.Panel>
          </Accordion>
        </div>
        <section className="w-full md:ml-[320px] 2xl:ml-[360px] h-screen">
          <Header title={`${location.pathname === '/clinic/enter-patch-test-results' ? 'Start Patch Test Visit' : location.pathname === '/clinic/register-new-patient' || location.pathname === '/clinic/send-questionnaire' || location.pathname === '/clinic/start-new-patch-order' ? 'New Patient' : 'Patients Data'}`} />
          <div class="container-fluid ">
            {/* Home Routes render section */}
            <Outlet />
          </div>
        </section>
      </div>
    </React.Fragment >
  )
}

export default SidebarLayout