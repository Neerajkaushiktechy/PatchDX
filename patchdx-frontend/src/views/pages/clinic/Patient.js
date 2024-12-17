import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import * as Yup from "yup";
import { getPatientRequest } from "../../../redux/module";
import { TableList, Loader, ToastMessage, Dropdown } from "../../../components";
import searchIcon from '../../../assets/images/input-search.svg'
import { getQuestionnaire } from "../../../redux/module/questionnaire/selector";
import { getQuestionnaireRequest } from "../../../redux/module/questionnaire/action";
import { sendQuestionnaireLink } from "../../../service/questionnaire/Questionnaire";

function Patient() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [openPatientInfo, setPatientInfo] = useState(false);
    const [openResponses, setOpenResponses] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [patientData, setPatientData] = useState({});
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: ""
    });
    let { getPatients } = useSelector((state) => {
        let { getPatients } = state;
        return {
            getPatients,
        }
    })
    let questionnaire = useSelector(state => getQuestionnaire(state));


    useEffect(() => {
        dispatch(getPatientRequest());
        dispatch(getQuestionnaireRequest());
    }, [dispatch]);

    const handleViewResponseClick = async (id) => {
        navigate(`/clinic/questionnaire-responses/${btoa(id)}`);
    }

    const handleSearch = async (id) => {
        dispatch(getPatientRequest(id));
    }

    const handlePatientInfo = async (id) => {
        navigate(`/clinic/patient-info?${id}`);
    }

    const handleQuestionnaire = async (patient) => {
        setPatientData(patient);
        setOpenModel(true)
    }

    const sendQuestionnaire = (values) => {
        sendQuestionnaireLink({ id: patientData._id, questionnaire: values.questionnaire, email: patientData.email }).then((res) => {
            if (res.data.success) {
                navigator.clipboard.writeText(res.data.url);
                setShowAlert({ show: true, title: "Email sent successfully" })
                setTimeout(() => {
                    setShowAlert({ show: false, title: "" })
                }, 5000);
                setOpenModel(false);
            }
        });
    }

    const handleClose=()=>{
        setOpenModel(false)
    }

    return (
        <>
            <ToastMessage showAlert={showAlert} />
            {!openPatientInfo && <div className="px-[30px]">
                <div className="block sm:flex justify-between items-center mb-5 sm:mb-[30px]">
                    <h1 className="main-title text-base sm:text-lg">Patients List</h1>

                    <div className="relative mt-2 sm:mt-0">
                        <input type="text" name="searchText" onChange={(e) => handleSearch(e.target.value)} className="form-control w-full sm:w-[442px] search-bar" placeholder="Search Patient" />
                        <img src={searchIcon} alt="patchDX" className="absolute top-[18px] left-5 w-[14px]" />
                    </div>
                </div>
                <div className="custom-table overflow-x-auto shadow-full h-[calc(100vh-230px)]">
                    <table class="w-full">
                        <thead>
                            <tr>
                            <th>First Name</th>
                                <th>Last Name</th>
                                <th>Patch Test Date</th>
                                <th>D.O.B</th>
                                <th>Sent Questionnaire</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {!getPatients?.loading && getPatients?.data && <TableList listData={getPatients} handlePatientInfo={handlePatientInfo} handleClick={handleViewResponseClick} handleQuestionnaire={handleQuestionnaire} isShowActionLink={true} />}
                    </table>
                    {getPatients?.loading && <Loader isLoading={getPatients?.loading} />}
                </div>
                {openModel && <Modal show={true} className="modal-popup" onClose={handleClose}>
                    <Modal.Header>Select Questionnaire</Modal.Header>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            questionnaire: '',
                        }}
                        onSubmit={(values) => {
                            sendQuestionnaire(values);
                        }}
                        validationSchema={Yup.object().shape({
                            questionnaire: Yup.string().required("Please select questionnaire"),
                        })}>
                        {() => (
                            <Form>
                                <Modal.Body className="modal-body">
                                    <Field name="questionnaire"
                                        className="form-control w-full leading-none"
                                        component={Dropdown}
                                        defaultOption="Select Questionnaire"
                                        options={questionnaire}
                                    />
                                    <button type='submit' className='btn-theme mt-5 w-full'>Send Questionnaire</button>
                                </Modal.Body>
                            </Form>
                        )}
                    </Formik>
                </Modal>}
            </div >}

        </>
    )
}

export default Patient