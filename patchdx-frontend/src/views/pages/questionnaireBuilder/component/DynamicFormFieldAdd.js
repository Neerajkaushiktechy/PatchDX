import { useState, Fragment } from 'react'
import { v4 as uuid } from 'uuid';
import closeIcon from "../../../../assets/images/close.svg";
import addIcon from "../../../../assets/images/add-icon.svg";

const DynamicFormFieldAdd = ({ fieldform, setshow, setfieldsArray, editCustomForm, seteditCustomForm }) => {
    const [formData, setformData] = useState({
        label: editCustomForm?.label ? editCustomForm?.label : "",
        placeholder: editCustomForm?.placeholder ? editCustomForm?.placeholder : "",
        options: editCustomForm?.options ? editCustomForm?.options : [{
            label: "",
            value: ""
        }],
    })


    const handleChangeFormOption = (e, i) => {
        let formValue = { ...formData };
        formValue.options[i]['label'] = e.target.value
        formValue.options[i]['value'] = e.target.value
        setformData(formValue)
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({ ...prev, [name]: value }))

    }

    const handleSubmit = (e) => {
        const unique_id = uuid();
        e.preventDefault();
        let dataObject = {
            fieldName: formData.label.slice(0, 4),
            id: unique_id.slice(0, 8),
            inputType: fieldform?.inputType,
            label: formData.label,
            defaultValue: "",
            placeholder: formData.placeholder
        }
        switch (fieldform?.inputType) {
            case 'text':
                break;
            case 'number':
                break;
            case 'textarea':
                break;
            case 'select':
                dataObject.options = formData.options
                break;
            case 'checkbox':
                dataObject.options = formData.options
                break;
            case 'multicheckbox':
                dataObject.options = formData.options
                break;
            case 'radiogroup':
                dataObject.options = formData.options
                break;
            default:

        }
        if (editCustomForm !== undefined && Object.keys(editCustomForm)?.length > 0) {
            setfieldsArray((prev) => {
                let updateArray = [...prev?.fields]
                let findIndex = updateArray?.findIndex((item) => item?.id === editCustomForm?.id)
                if (findIndex !== -1) {
                    updateArray[findIndex] = dataObject
                }
                return {
                    ...prev,
                    fields: updateArray
                }
            })
            seteditCustomForm({})
        }
        else {
            setfieldsArray((prev) => {
                return {
                    ...prev,
                    fields: [...prev.fields, dataObject]
                }
            })
        }
        setshow(false)
    }

    const handleAddOption = () => {
        setformData((prev) => {
            return {
                ...prev,
                options: [...prev.options, {
                    label: "",
                    value: ""
                }]
            }
        })
    }
    const handleDeleteOption = (index) => {
        formData.options.splice(index, 1)
        setformData((prev) => {
            return {
                ...prev,
                options: formData.options
            }
        })
    }

    const dynamicFormLabel = () => {
        switch (fieldform?.inputType) {
            case 'text':
                return (
                    <>
                        <div className="mb-[30px]">
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <label className="form-label mb-3" required>{fieldform?.fieldform?.Placeholder}</label>
                            <input
                                id="placeholder"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Placeholder"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData?.placeholder}
                                name="placeholder"
                            />
                        </div>
                    </>
                )
            case 'number':
                return (
                    <>
                        <div className="mb-[30px]">
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <label className="form-label mb-3" required>{fieldform?.fieldform?.Placeholder}</label>
                            <input
                                id="placeholder"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Placeholder"
                                type='number'
                                onChange={handleChangeForm}
                                value={formData?.placeholder}
                                name="placeholder"
                            />
                        </div>
                    </>
                )
            case 'textarea':
                return (
                    <>
                        <div className="mb-[30px]">
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <label className="form-label mb-3" required>{fieldform?.fieldform?.Placeholder}</label>
                            <input
                                id="placeholder"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Placeholder"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData?.placeholder}
                                name="placeholder"
                            />
                        </div>
                    </>
                )

            case 'select':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mt-[30px]">
                                <label className='form-label mb-3'>{fieldform?.fieldform?.OptionLabel}</label>
                                <img onClick={handleAddOption} src={addIcon} alt="" />
                            </div>
                            {
                                formData?.options?.map((item, index) => (
                                    <Fragment key={index}>
                                        <div className="flex mt-2">
                                            <input
                                                id="label"
                                                className="form-control w-full bg-transparent border border-color-blue"
                                                placeholder="Enter Question"
                                                required
                                                type='text'
                                                onChange={(e) => handleChangeFormOption(e, index)}
                                                value={item?.value}
                                                name="label" />
                                            {
                                                index > 0 &&
                                                <img onClick={() => { handleDeleteOption(index) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            case 'checkbox':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mt-[30px]">
                                <label className='form-label mb-3'>{fieldform?.fieldform?.OptionLabel}</label>
                                <img onClick={handleAddOption} src={addIcon} alt="" />
                            </div>
                            {
                                formData?.options?.map((item, index) => (
                                    <Fragment key={index}>
                                        <div className="flex mt-2">
                                            <input
                                                id="label"
                                                className="form-control w-full bg-transparent border border-color-blue"
                                                placeholder="Enter Question"
                                                required
                                                type='text'
                                                onChange={(e) => handleChangeFormOption(e, index)}
                                                value={item?.value}
                                                name="label" />
                                            {
                                                index > 0 &&
                                                <img onClick={() => { handleDeleteOption(index) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            case 'multicheckbox':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mt-[30px]">
                                <label className='form-label mb-3'>{fieldform?.fieldform?.OptionLabel}</label>
                                <img onClick={handleAddOption} src={addIcon} alt="" />
                            </div>
                            {
                                formData?.options?.map((item, index) => (
                                    <Fragment key={index}>
                                        <div className="flex mt-2">
                                            <input
                                                id="label"
                                                className="form-control w-full bg-transparent border border-color-blue"
                                                placeholder="Enter Question"
                                                required
                                                type='text'
                                                onChange={(e) => handleChangeFormOption(e, index)}
                                                value={item?.value}
                                                name="label" />
                                            {
                                                index > 0 &&
                                                <img onClick={() => { handleDeleteOption(index) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            case 'radiogroup':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mt-[30px]">
                                <label className='form-label mb-3'>{fieldform?.fieldform?.OptionLabel}</label>
                                <img onClick={handleAddOption} src={addIcon} alt="" />
                            </div>
                            {
                                formData?.options?.map((item, index) => (
                                    <Fragment key={index}>
                                        <div className="flex mt-2">
                                            <input
                                                id="label"
                                                className="form-control w-full bg-transparent border border-color-blue"
                                                placeholder="Enter Question"
                                                required
                                                type='text'
                                                onChange={(e) => handleChangeFormOption(e, index)}
                                                value={item?.value}
                                                name="label" />
                                            {
                                                index > 0 &&
                                                <img onClick={() => { handleDeleteOption(index) }} src={closeIcon} alt="" className="ml-[10px] w-5" />
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            case 'file':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">File Upload</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                    </>
                )
            case 'date':
                return (
                    <>
                        <div>
                            <label className="form-label mb-3">Add Question</label>
                            <input
                                id="label"
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Question"
                                required
                                type='text'
                                onChange={handleChangeForm}
                                value={formData.label}
                                name="label"
                            />
                        </div>
                    </>
                )
            default:
                <></>
        }
    }
    return (
        <>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div>
                    {dynamicFormLabel()}
                </div>

                <div className="flex justify-end gap-7 mt-[30px]">
                    <button className="btn-theme btn-border" onClick={() => {
                        setshow(false);
                        if (seteditCustomForm != undefined) {
                            seteditCustomForm({})
                        }
                    }}>
                        Close
                    </button>
                    <button className="btn-theme">
                        {editCustomForm !== undefined && Object.keys(editCustomForm)?.length > 0 ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </>
    )
}

export default DynamicFormFieldAdd