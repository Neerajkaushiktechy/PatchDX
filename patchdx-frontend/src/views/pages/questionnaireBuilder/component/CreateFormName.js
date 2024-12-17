import { useState, useEffect } from 'react';
import { checkQuestionnaireExist } from "../../../../service/questionnaire/Questionnaire";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
//import { postcustomFormRequest } from '../../../../redux/modules/customform/action';
import { useDispatch, useSelector } from 'react-redux';

let initialValue = {
    formName: ''
};

function setError(actions, fieldName, error) {
    actions.setFieldTouched(fieldName, true);
    window.setTimeout(() => {
        actions.setFieldError(fieldName, error);
    }, 100);
}

const CreateFormName = ({ fieldsArray, setfieldsArray, handleClose, copyTemplatePopup, setcopyfieldsArray, setcreateFormPopup }) => {
    const [formData, setformData] = useState("");
    const [formExists, setFormExists] = useState(false);
    initialValue.formName = fieldsArray?.formName;
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let { postCustomForm, } = useSelector((state) => {
        let { postCustomForm } = state
        return {
            postCustomForm
        }
    })

    const handleSubmit = async (value, action) => {
        const questionnaireTitle = fieldsArray?.formName === value.formName ? fieldsArray?.formName : value.formName;
        checkQuestionnaireExist({ formData: questionnaireTitle })
            .then(async (res) => {
                if (res.data.success) {
                    setfieldsArray((prev) => {
                        return {
                            ...prev,
                            formName: formData,
                        };
                    });
                    setcreateFormPopup(false);
                } else {
                    setError(action, 'formName', 'Questionnaire is already exist');
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValue}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validationSchema={() => Yup.lazy(values => Yup.object().shape({
                    formName: Yup.string()
                        .trim()
                        .required('Questionnaire name is required.'),
                }))}>
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <div>
                            <label className="form-label mb-3">Add Questionnaire</label>
                            <Field
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder="Enter Questionnaire"
                                type='text'
                                onChange={(e) => { setFieldValue('formName', e.target.value); setformData(e.target.value) }}
                                name="formName"
                            />
                            <ErrorMessage name="formName" />
                        </div>
                        <div className="flex justify-end gap-7 mt-[30px]">
                            <button className="btn-theme btn-border" onClick={() => {
                                if (handleClose !== undefined) {
                                    handleClose()
                                }
                                else {
                                    navigate('/clinic/questionnaire-list')
                                }
                            }}>
                                Cancel
                            </button>
                            <button className="btn-theme">
                                Save
                            </button>
                        </div>
                    </Form>)}
            </Formik>
        </>
    );
};

export default CreateFormName;
