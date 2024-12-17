import { useFormContext, Controller } from "react-hook-form";
import { Field } from "formik";
//import { DynamicFieldData } from "../dynamic-control-types";
import { useEffect, useState } from 'react'
//import { decrypt } from "../../../utils/encryptDecrypt";
import {
    Checkbox,
    TextInput,
    Textarea,
    Label,
    Select,
    Radio,
    FileInput,
} from "flowbite-react";
import closeIcon from "../../../../assets/images/close.svg";
export const RenderFormField = ({
    inputType,
    fieldName,
    id,
    defaultValue,
    placeholder,
    options = [],
    label,
}) => {
    const { register, control } = useFormContext();
    const [roleId, setRoleId] = useState(undefined)
    const [isChecked, setIsChecked] = useState(false);
    const [isMultiChecked, setIsMultiChecked] = useState(false);
    const [isRadioChecked, setIsRadioChecked] = useState(false);
    const [formData, setformData] = useState({
        label: fieldName,
        answer: []
    })

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, answer: value, [name]: name }))
    }
    switch (inputType) {
        case "text":
            return (
                <>
                    <div className="mb-[30px]">
                        <label className="form-label mb-3">{label}</label>
                        <Field
                            id={fieldName}
                            className="form-control w-full bg-transparent border border-color-blue"
                            placeholder={placeholder}
                            type='text'
                            value={formData.answer}
                            name={label}
                        />
                    </div>
                </>
            );
        case "number":
            return (
                <>
                    <div className="mb-[30px]">
                        <label className="form-label mb-3">{label}</label>
                        <Field
                            id={fieldName}
                            className="form-control w-full bg-transparent border border-color-blue"
                            placeholder={placeholder}
                            type='number'
                            value={formData.answer}
                            name={label}
                        />
                    </div>
                </>
            );
        case "select":
            return (
                <div className="flex">
                    <Select
                        defaultValue={defaultValue}
                        name={id}
                        id={fieldName}
                        fullWidth
                        disableUnderline
                        className="select-form-input"
                    >
                        {options.map((o, index) => (
                            <option>{o.label}</option>
                        ))}
                    </Select>
                </div >
            );
        case 'textarea':
            return (
                <div className="mb-[30px]">
                    <label className="form-label mb-3">{label}</label>
                    <input
                        id={fieldName}
                        className="form-control w-full bg-transparent border border-color-blue"
                        placeholder={placeholder}
                        type='text'
                        rows={2}
                        name={label}
                    />
                </div>
            )

        case 'checkbox':
            return (
                <div className="flex">
                    {options.map((option) => {
                        return (
                            <Controller
                                defaultValue={defaultValue}
                                name={id}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <>
                                            <Checkbox
                                                required={isChecked === false && roleId === 2 ? true : false}
                                                checked={option.value === value ? true : false}
                                                onChange={() => {
                                                    onChange(option.value);
                                                    setIsChecked(true);
                                                }}
                                            />
                                            <Label className="ml-2">{option.label}</Label>
                                        </>
                                    );
                                }}
                            />

                        );
                    })}
                </div>
            );

        case 'multicheckbox':
            return (
                <div className="flex">
                    {options.map((option, index) => {
                        return (
                            <Controller
                                key={index}
                                control={control}
                                defaultValue={defaultValue}
                                name={id}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <>
                                            <Checkbox
                                                required={isMultiChecked === false && roleId === 2 ? true : false}
                                                checked={value !== undefined && value.length > 0 && value?.includes(option.value)}
                                                onChange={(e) => {
                                                    const { checked } = e.target
                                                    let newValue;

                                                    if (checked) {
                                                        if (Array.isArray(value)) {
                                                            newValue = [...value, option.value]
                                                        }
                                                        else {
                                                            newValue = [option.value];
                                                        }
                                                    }
                                                    else {
                                                        let array = [...value];
                                                        let index = array.findIndex((item) => item === option.value);
                                                        array.splice(index, 1);
                                                        if (array?.length > 0) newValue = array;
                                                        else newValue = "";
                                                    }
                                                    onChange(newValue)
                                                    setIsMultiChecked(true);
                                                }
                                                }
                                            />
                                            <Label className="ml-2 mr-6">{option.label}</Label>

                                        </>
                                    );
                                }}
                            />
                        );
                    })}
                </div>
            );
        case 'radiogroup':
            return (
                <div className="flex">
                    <Controller
                        control={control}
                        name={id}
                        defaultValue={defaultValue}
                        render={({ field: { onChange, value } }) => {
                            return (options.map((o, index) => (
                                <>

                                    <Radio
                                        required={isRadioChecked === false && roleId === 2 ? true : false}
                                        onChange={() => {
                                            onChange(o.value);
                                            setIsRadioChecked(true);
                                        }}
                                        checked={o.value === value ? true : false}
                                    />
                                    <Label className="ml-2 mr-6">{o.label}</Label>

                                </>
                            ))
                            )
                        }}

                    />
                </div >
            );
        case "file":
            return (
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={id}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <div className="flex">
                                <FileInput
                                    id={fieldName}
                                    {...field}
                                    value={value?.fileName}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }}
                                    type="file"
                                />
                            </div >
                        );
                    }}
                />
            );
        // case "date":
        //     return (
        //         <Grid item xs={12} sx={{ marginBottom: "30px" }}>
        //             <Controller
        //                 control={control}
        //                 defaultValue={defaultValue}
        //                 name={id}
        //                 render={({ field: { onChange, value } }) => {
        //                     return (
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                             <DatePicker
        //                                 disabled={show}
        //                                 format="MM/DD/YYYY"
        //                                 onChange={(event) => onChange(event)}
        //                                 value={value || null}
        //                                 className='custom-datepicker'
        //                             />
        //                         </LocalizationProvider>
        //                     )
        //                 }}
        //             />
        //         </Grid>
        //     );
        default:
            return <></>
    }
};
