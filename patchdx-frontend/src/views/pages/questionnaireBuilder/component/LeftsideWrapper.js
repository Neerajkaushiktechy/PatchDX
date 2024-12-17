import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectField } from '../../../../utils/formControl'
import ModalPopup from '../../../../components/model/ModelPopup'
import DynamicFormFieldAdd from './DynamicFormFieldAdd';
import CreateFormName from './CreateFormName';
import { useSearchParams, useLocation } from 'react-router-dom';

export default function LeftSideWrapper({ setfieldsArray, fieldsArray, customFormId, location, show, setshow, id, setId, editCustomForm, seteditCustomForm, setcopyfieldsArray, setcopyTemplatePopup, copyTemplatePopup, setShowAlert }) {
    const [createFormPopup, setcreateFormPopup] = useState(false);
    let [searchParams] = useSearchParams()
    let { postCustomForm, } = useSelector((state) => {
        let { postCustomForm } = state
        return {
            postCustomForm
        }
    })
    useEffect(() => {
        if (location.search !== '') {
            setcreateFormPopup(false);
        } else {
            setcreateFormPopup(true);
        }
    }, [])


    const checkHeight = (inputType) => {
        switch (inputType) {
            case 'select':
                return '70%'
            case 'checkbox':
                return '70%'
            case 'multicheckbox':
                return '70%'
            case 'radiogroup':
                return '70%'
            default:
                return 'auto'
        }
    }

    const editData = (item) => {
        let editobject = {
            ...item,
            fieldform: selectField?.find((f) => f?.inputType === item?.inputType)?.fieldform
        }
        return editobject
    }

    return (
        <>
            <div className="col-span-12 md:col-span-5">
                <div className="bg-card rounded-[10px] p-5">
                    <h2 className="text-xl font-semibold mb-[30px] text-primary">Common Fields</h2>
                    <ul className="flex flex-wrap gap-3">
                        <>
                            {selectField.map((f, i) => (
                                <>
                                    <li className="border border-list-stroke rounded-[10px] px-5 py-4 text-center w-full sm:w-[46%]" onClick={() => { setId(f.id); setshow(true) }}>
                                        <f.icon className="text-[32px] mx-auto mb-4 text-icon" />
                                        <span key={i} className="text-lg font-medium text-sub-text">{f.title}</span>
                                    </li >
                                    {

                                        id === f.id &&
                                        <ModalPopup height={() => checkHeight(f.inputType)} classField="form_filled modal_poppup" type="assignment" view="" width="40%" show={show} setshow={setshow} childern={<DynamicFormFieldAdd fieldform={f} show={show} setshow={setshow} setfieldsArray={setfieldsArray} />} />

                                    }
                                </>
                            ))}
                            {
                                Object.keys(editCustomForm)?.length > 0 &&
                                <ModalPopup height={() => checkHeight(editCustomForm?.inputType)} classField="form_filled modal_poppup" type="assignment" view="" width="40%" show={show} setshow={setshow} seteditCustomForm={() => seteditCustomForm({})} childern={<DynamicFormFieldAdd fieldform={editData(editCustomForm)} show={show} setshow={setshow} setfieldsArray={setfieldsArray} editCustomForm={editCustomForm} seteditCustomForm={() => seteditCustomForm({})} />} />
                            }
                        </>



                    </ul>
                    {
                        fieldsArray?.formName === "" && location === "" && createFormPopup && customFormId === "" &&
                        <ModalPopup classField="modal_poppup" width="40%" view="" height="auto" type="assignment" show={createFormPopup} setshow={() => { return; }} childern={<CreateFormName setfieldsArray={setfieldsArray} />} />
                    }
                </div>
            </div >
            {
                fieldsArray?.formName === "" && createFormPopup && customFormId === "" &&
                <ModalPopup classField="modal_poppup" width="40%" view="" height="auto" type="assignment" show={createFormPopup} setshow={() => { return; }} childern={<CreateFormName setfieldsArray={setfieldsArray} setcreateFormPopup={setcreateFormPopup} />} />
            }
        </>
    )
}
