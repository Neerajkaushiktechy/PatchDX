import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InputField, Dropdown } from '../../components'
import { UserLogin } from '../../service/account/LoginService';
import AuthService from '../../service/authService/AuthService';
import { useDispatch, useSelector } from "react-redux";
import { SpinnerButton } from "../../components";
import { getQuestionnaire, getPendingQuestionnaire } from "../../redux/module/questionnaire/selector";
import { getQuestionnaireRequest } from "../../redux/module/questionnaire/action";
import { submitPatientFormRequest } from "../../redux/module";
import { ToastMessage } from "../../components";

const patientSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter you email"),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
    dateOfBirth: Yup.string().required("DOB is required"),
    questionnaire: Yup.string().required("Please select questionnaire"),
});
export function RegisterPatientForm() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: ""
    });

    let questionnaire = useSelector(state => getQuestionnaire(state));
    let { submitPatientForm } = useSelector((state) => {
        let { submitPatientForm } = state;
        return {
            submitPatientForm,
        }
    })

    useEffect(() => {
        dispatch(getQuestionnaireRequest());
    }, [dispatch]);

    const onSubmit = async (values) => {
        setShowAlert({ show: true, title: 'Patch order submitted successfully' });
        dispatch(submitPatientFormRequest(values));
        setTimeout(() => {
            setShowAlert({ show: submitPatientForm?.loading, title: 'Submit patient successfully' });
        }, 3000);
        navigate('/clinic/patient');
    };

    const handleClose = () => {
        navigate('/clinic/patient');
    }

    return (
        <React.Fragment>
            <ToastMessage showAlert={showAlert} />
            <Formik
                enableReinitialize={true}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    dateOfBirth: '',
                    questionnaire: ''
                }}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
                validationSchema={patientSchema}>
                {({ errors, values }) => (
                    <Form>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">First Name</label>
                                <Field className='form-control w-full' type='text' name='firstName' isLogin={false} placeholder='Enter first name' component={InputField} />
                            </div>
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">Last Name</label>
                                <Field className='form-control w-full' type='text' name='lastName' isLogin={false} placeholder='Enter last name' component={InputField} />
                            </div>
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">Email Address</label>
                                <Field className='form-control w-full' type='text' name='email' isLogin={false} placeholder='Enter email address' component={InputField} />
                            </div>
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">Phone Number</label>
                                <Field className='form-control w-full' type='text' name='phoneNumber' isLogin={false} placeholder='Enter phone Number' component={InputField} />
                            </div>
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">Date of Birth</label>
                                <Field className='form-control w-full' type='date' name='dateOfBirth' isLogin={false} placeholder='Enter D.O.B' component={InputField} />
                            </div>
                            <div className="mb-0 sm:mb-5">
                                <label className="form-label mb-3">Select Questionnaire</label>
                                <Field name="questionnaire"
                                    className="form-control w-full leading-none"
                                    component={Dropdown}
                                    defaultOption="Select Questionnaire"
                                    options={questionnaire}
                                />
                            </div>
                        </div>
                        <div className="mt-[60px]">
                            <button onClick={() => handleClose()} className="btn-theme btn-border mr-[30px]">Close</button>
                            <SpinnerButton isLoading={submitPatientForm?.isLoading} label="Submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default RegisterPatientForm;
