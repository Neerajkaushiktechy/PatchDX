import React from 'react'
import { Spinner } from "flowbite-react";

const SpinnerButton = ({ isLoading, label }) => (
    <button type='submit' className="btn-theme">
        {isLoading && <Spinner aria-label="Spinner button example" size="sm" />}
        {label}
    </button>
);

export default SpinnerButton;