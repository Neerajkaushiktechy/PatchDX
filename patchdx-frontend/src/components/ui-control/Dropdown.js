import React from "react";
import ErrorMessage from "./ErrorMessage";


const Dropdown = ({ ...props }) => {
    return (
        <React.Fragment>
            <Select {...props} />
        </React.Fragment>
    );
};

export default Dropdown;

const Select = ({
    label,
    options,
    defaultOption,
    field,
    form,
    children,
    extendWidth,
    ...props
}) => {
    return (
        <React.Fragment>
            {label && <label className='label-style'> {label} </label>}
            <select className="form-control w-full" {...field} {...props}>
                {defaultOption && <option value=""> {defaultOption}</option>}
                {options &&
                    options.length &&
                    options.map((option, index) => (
                        <option key={index} value={option.value} >
                            {option.text}
                        </option>
                    ))}
            </select>
            <ErrorMessage form={form} field={field} />
            {children}
        </React.Fragment>
    )
};