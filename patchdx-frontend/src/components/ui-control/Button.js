import React from "react";
import { Spinner } from "flowbite-react";

const Button = ({ className, text, isLoading, isForm, handleSubmitOrder }) => (
    <>{isForm && <button type="submit" className={className}>
        {isLoading && <Spinner aria-label="Alternate spinner button example" size="sm" />}
        {text}
    </button>}
        {!isForm && <button type="submit" onClick={(e)=>handleSubmitOrder(e)} className={className}>
            {isLoading && <Spinner aria-label="Alternate spinner button example" size="sm" />}
            {text}
        </button>}
    </>
);

export default Button;
