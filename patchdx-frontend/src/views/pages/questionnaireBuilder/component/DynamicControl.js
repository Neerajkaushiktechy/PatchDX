import { useFormContext, Controller } from "react-hook-form";
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
    Datepicker
} from "flowbite-react";
import closeIcon from "../../../../assets/images/close.svg";
export const DynamicControl = ({
    inputType,
    fieldName,
    id,
    defaultValue,
    placeholder,
    options = [],
    config = {},
    show,
    checkFormType,
    customFormId,
    handleEditForm,
}) => {
    const { register, control } = useFormContext();
    const [roleId, setRoleId] = useState(undefined)
    const [isChecked, setIsChecked] = useState(false);
    const [isMultiChecked, setIsMultiChecked] = useState(false);
    const [isRadioChecked, setIsRadioChecked] = useState(false);
    useEffect(() => {
        const item = localStorage.getItem("item");
        // if (localStorage.getItem("item")) {
        //   const token = JSON.parse(decrypt(item))
        //   const parts = token.token.split('.');
        //   const payload = JSON.parse(window.atob(parts[1]));
        //   setRoleId(payload.roleId);
        // }
    }, [])
    switch (inputType) {
        case "text":
            return (
                <>
                    <div className="flex">
                        <TextInput
                            className="form-input w-full"
                            id={fieldName}
                            {...register(id, config)}
                            value={defaultValue}
                            type='text'
                            name={id}
                            placeholder={placeholder}
                            disabled={show}
                        />
                        {
                            customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                        }
                    </div>
                </>
            );
        case "number":
            return (
                <>
                    <div className="flex">
                        <TextInput
                            className="form-input w-full"
                            id={fieldName}
                            {...register(id, config)}
                            value={defaultValue}
                            type='number'
                            name={id}
                            placeholder={placeholder}
                            disabled={show}
                        />
                        {
                            customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                        }
                    </div>
                </>
            );
        case "select":
            return (
                <div className="flex">
                    <Select
                        {...register(id, config)}
                        defaultValue={defaultValue}
                        name={id}
                        disabled={show}
                        id={fieldName}
                        fullWidth
                        disableUnderline
                        className="select-form-input w-full"
                    >
                        {options.map((o, index) => (
                            <option>{o.label}</option>
                        ))}
                    </Select>
                    {
                        customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                    }
                </div >
            );
        case 'textarea':
            return (
                <div className="flex">
                    <Textarea
                        {...register(id, config)}
                        defaultValue={defaultValue}
                        id={fieldName}
                        name={id}
                        type='text'
                        disabled={show}
                        rows={2}
                        placeholder={placeholder}
                        className="form-control"
                    />
                    {
                        customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                    }
                </div >
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
                                                disabled={show}
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
                    {
                        customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                    }
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
                                                disabled={show}
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
                    {
                        customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                    }
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
                    {
                        customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                    }
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
                                    className="w-full"
                                />
                                {
                                    customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                }
                            </div >
                        );
                    }}
                />
            );
        case "date":
            return (
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={id}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <div className="flex">
                                <Datepicker
                                    disabled={show}
                                    format="MM/DD/YYYY"
                                    onChange={(event) => onChange(event)}
                                    value={value || null}
                                    className='custom-datepicker'
                                    placeholder="MM/DD/YYYY"
                                />
                                {
                                    customFormId && <img onClick={(e) => { e.preventDefault(); handleEditForm(id) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                }
                            </div>
                        )
                    }}
                />
            );
        default:
            return <></>
    }
};
