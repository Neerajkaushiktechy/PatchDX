import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPatientRequest } from "../../../redux/module";
import { PatchTableList, Loader, ToastMessage } from "../../../components";
import searchIcon from '../../../assets/images/input-search.svg'

function PatchTestResults() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
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
    }, [dispatch]);

    const handleSearch = async (id) => {
        dispatch(getPatientRequest(id));
    }

    const handleEnterPatchResult = async (id) => {
        navigate(`/clinic/enter-patch-results/${btoa(id)}`);
    }

    return (
        <>
            <ToastMessage showAlert={showAlert} />
            <div className="px-[30px]">
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
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>D.O.B</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {!getPatients?.loading && getPatients?.data && <PatchTableList listData={getPatients} handleEnterPatchResult={handleEnterPatchResult} isSummary={false} />}
                    </table>
                    {getPatients?.loading && <Loader isLoading={getPatients?.loading} />}
                </div>
            </div >
        </>
    )
}

export default PatchTestResults