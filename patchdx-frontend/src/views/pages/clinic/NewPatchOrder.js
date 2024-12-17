import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getPatientRequest } from "../../../redux/module";
import { PatientTable, Loader } from "../../../components";
import searchIcon from '../../../assets/images/input-search.svg'
import StartnewPatchOrder from "./component/StartnewPatchOrder";
import { submitPatchOrderRequest } from "../../../redux/module";
import { ToastMessage } from '../../../components';

function NewPatchOrder() {
    let dispatch = useDispatch();
    let [isStartPatch, setStartPatch] = useState(false);
    let [patientId, setPatientId] = useState();
    let [selectedPatient, setSelectedPatient] = useState('');

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

    useEffect(() => {
        dispatch(getPatientRequest());
    }, [dispatch, getPatients?.data?.success]);

    if (getPatients?.loading) {
        return <Loader isLoading={getPatients?.loading} />
    }

    const handleViewResponseClick = async (id) => {
    }

    const selectPatient = async (id, e) => {
        setSelectedPatient(e.target.name)
        setPatientId(id)
    }

    const handleSearch = async (id) => {
        dispatch(getPatientRequest(id));
    }


    const handleStartPatch = async (id) => {
        if (patientId) {
            setStartPatch(true)
        } else {
            setShowAlert({ show: true, title: "Please select patient" })
            setTimeout(() => {
                setShowAlert({ show: false, title: "" })
            }, 5000);
        }

    }

    return (
        <>
            <ToastMessage showAlert={showAlert} />
            {!isStartPatch && <div className="px-[30px]">
                <div className="block sm:flex justify-between items-center mb-[30px]">
                    <h1 className="main-title">Patients</h1>
                    <div className="block sm:flex items-center">
                        <div className="relative mt-2 sm:mt-0 mb-2 sm:mb-0">
                            <input type="text" name="searchText" onChange={(e) => handleSearch(e.target.value)} className="form-control w-full sm:w-[300px] md:w-[442px] search-bar" placeholder="Search Patient" />
                            <img src={searchIcon} alt="patchDX" className="absolute top-[18px] left-5 w-[14px]" />
                        </div>
                        <button type='submit' onClick={handleStartPatch} className="btn-theme ml-0 sm:ml-4">Start Patches</button>
                    </div>
                </div>
                <div className="custom-table overflow-x-auto shadow-full">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>D.O.B</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        {!getPatients?.loading && getPatients?.data && <PatientTable listData={getPatients} handleClick={handleViewResponseClick} isShowActionLink={false} selectPatient={selectPatient} selectedPatient={selectedPatient} />}
                    </table>
                    {getPatients?.loading && <Loader isLoading={getPatients?.loading} />}
                </div>
            </div>}
            {isStartPatch && <StartnewPatchOrder setStartPatch={setStartPatch} setAlert={setShowAlert} patient={patientId} />}
        </>
    )
}

export default NewPatchOrder;