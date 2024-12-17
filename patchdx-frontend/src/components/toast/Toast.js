import React from 'react'
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const ToastMessage = ({ showAlert, handleClick }) => {

    return (showAlert.show && <Toast className="absolute top-5 end-5 z-50 shadow">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{showAlert.title}.</div>
        <Toast.Toggle />
    </Toast>)
}

export default ToastMessage;