import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from "formik";
import moment from "moment";
import * as Yup from 'yup'
import { useSelector, useDispatch } from "react-redux";
import { getQuestionnaire } from "../../../redux/module/questionnaire/selector";
import { InputField, ToastMessage } from '../../../components';
import { getQuestionnaireRequest } from "../../../redux/module/questionnaire/action";
import { getPatientByName } from "../../../service/patient/Patient";
import { getPatientRequest } from "../../../redux/module";
import { sendQuestionnaireLink, copyQuestionnaireLink } from "../../../service/questionnaire/Questionnaire";

const searchSchema = Yup.object().shape({
    patientName: Yup.string().required("Name is required"),
    dateOfBirth: Yup.string().required("DOB is required"),
});

function SendQuestionnaire() {
    let dispatch = useDispatch();
    const [selectedQuestionnaire, setQuestionnaire] = useState('');
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: ""
    });

    let questionnaire = useSelector(state => getQuestionnaire(state));

    let { getPatients } = useSelector((state) => {
        let { getPatients } = state;
        return {
            getPatients,
        }
    })

    useEffect(() => {
        dispatch(getPatientRequest());
    }, [dispatch, getPatients?.data?.success]);

    useEffect(() => {
        dispatch(getQuestionnaireRequest());
    }, [dispatch]);

    const onPatientSearch = async (values) => {
        dispatch(getPatientRequest(values));
    }

    const sendQuestionnaireMail = async (patient) => {
        if (selectedQuestionnaire) {
            sendQuestionnaireLink({ id: patient._id, questionnaire: selectedQuestionnaire, email: patient.email }).then((res) => {
                if (res.data.success) {
                    navigator.clipboard.writeText(res.data.url);
                    setShowAlert({ show: true, title: "Email sent successfully" })
                    setTimeout(() => {
                        setShowAlert({ show: false, title: "" })
                    }, 5000);
                }
            });
        } else {
            setShowAlert({ show: true, title: "Please select questionnaire" })
            setTimeout(() => {
                setShowAlert({ show: false, title: "" })
            }, 5000);
        }
    }

    const selectQuestionnaire = (e) => {
        setQuestionnaire(e.target.value);
    }

    const copyQuestionnaireUrl = (patient) => {
        if (selectedQuestionnaire) {
            copyQuestionnaireLink({ id: patient._id, questionnaire: selectedQuestionnaire }).then((res) => {
                if (res.data.success) {
                    navigator.clipboard.writeText(res.data.url);
                    setShowAlert({ show: true, title: "Questionnaire url copied" })
                    setTimeout(() => {
                        setShowAlert({ show: false, title: "" })
                    }, 5000);
                }
            })
        } else {
            setShowAlert({ show: true, title: "Please select questionnaire" })
            setTimeout(() => {
                setShowAlert({ show: false, title: "" })
            }, 5000);
        }
    }

    return (
        <>
            <ToastMessage showAlert={showAlert} />
            <div className="px-[30px]">
                <div className="mb-5 sm:mb-[30px]">
                    <h1 className="main-title text-base sm:text-lg">Send New Questionnaire</h1>
                </div>
                <div className="card mb-[30px] p-6">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            patientName: '',
                            dateOfBirth: ''
                        }}
                        onSubmit={(values) => {
                            onPatientSearch(values);
                        }}
                        validationSchema={searchSchema}>
                        {() => (
                            <Form>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4">
                                    <div>
                                        <label className="form-label mb-3">Patient Name</label>
                                        <Field name='patientName' type='text' isLogin={false} className="form-control w-full" placeholder="Enter name" component={InputField} />
                                    </div>
                                    <div>
                                        <label className="form-label mb-3">D.O.B</label>
                                        <Field name='dateOfBirth' isLogin={false} type='date' className="form-control w-full" placeholder="Enter DOB" component={InputField} />
                                    </div>
                                    <div>
                                        <label className="form-label mb-3 hidden sm:block sm:opacity-0">Search</label>
                                        <button type='submit' className="btn-theme">Search Results</button>
                                    </div>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
                <div className="custom-table overflow-x-auto shadow-full">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>D.O.B</th>
                                <th>Questionnaire</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPatients?.data.map((patient, i) => (
                                <tr>
                                    <td>{patient.firstName}</td>
                                    <td>{patient.lastName}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.phoneNumber}</td>
                                    <td>{moment(patient.dateOfBirth).format('MM/DD/YYYY')}</td>
                                    <td>
                                        <select defaultValue={selectedQuestionnaire} onChange={(e) => selectQuestionnaire(e)} className="rounded-md px-[10px] py-1 bg-input-bg text-secondary-text">
                                            <option value=''>Select questionnaire</option>
                                            {questionnaire?.map((option, index) => (
                                                <option key={index} value={option.value} >
                                                    {option.text}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => copyQuestionnaireUrl(patient)} className="border border-primary rounded-md text-base font-medium px-[10px] py-1 text-primary bg-white">Generate URL</button>
                                        <button onClick={() => sendQuestionnaireMail(patient)} className="border border-primary rounded-md text-base font-medium px-[10px] py-1 text-primary bg-white ml-3">Share via Email</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SendQuestionnaire