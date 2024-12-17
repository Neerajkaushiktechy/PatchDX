import React from 'react'
import RegisterPatientForm from '../../forms/PatientRegistrationForm';

function RegisterPatient() {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="px-[30px]">
          <div className="mb-5 sm:mb-[30px]">
            <h1 className="main-title text-base sm:text-lg">Register New Patient</h1>
          </div>
          <div className="card">
            <RegisterPatientForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPatient