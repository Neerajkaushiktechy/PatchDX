import React from "react";
import { useFormikContext } from "formik";
import { RenderIf, ErrorMessage } from '../index'

const InputField = ({ ...props }) => {
    return (
        <React.Fragment>
            <div className="mb-5">
                <Input {...props} />
            </div>
        </React.Fragment>
    )
};

export default InputField;

const Input = ({
    label,
    type = "text",
    field,
    form,
    icon,
    isLogin,
    placeholder,
    className,
    inputFieldChildren,
    ...props
}) => {
    const formik = useFormikContext();

    const formatInput = (event) => {
        const inputValue = event.target.value ? event.target.value.replace(/,/g, '') : '';
        formik.setFieldValue(field.name, inputValue.trim() !== "" ? inputValue : "");
    };

    return (
        <React.Fragment>
            {label && <label className='label-style'> {label} </label>}
            <input
                type={type}
                name={field.name}
                {...props}
                className="form-control w-full"
                onChange={formatInput}
                placeholder={placeholder}
            />
            {isLogin && <img {...props} src={icon} className="absolute left-[20px] md:left-[30px] top-[15px] md:top-[18px] w-4 md:w-auto"></img>}
            <RenderIf shouldRender={form && field}>
                <ErrorMessage form={form} field={field} />
            </RenderIf>
            {inputFieldChildren}
        </React.Fragment>
    );
};