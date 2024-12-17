import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import searchIcon from '../../../../assets/images/input-search.svg'
import { IoClose } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Accordion } from "flowbite-react";
import { Checkbox, Label } from "flowbite-react";
import { getIndividualAllergen, getGroupAllergen } from "../../../../service/patch/patch";
import { submitPatchOrderRequest } from "../../../../redux/module";
import ReviewQuestionnaire from "./ReviewQuestionnaire";
import { ToastMessage, Button } from "../../../../components";


function StartnewPatchOrder({ patient, setStartPatch, setAlert }) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let [individualAllergens, setAllergens] = useState([]);
    let [groupAllergens, setGroupAllergens] = useState([]);
    let [openModal, setOpenModal] = useState(false);
    let [selectedGAllergens, setSelectedGAllergen] = useState({
        gAllergens: [{
            groupId: '',
            groupName: '',
            allergens: []
        }]
    });

    let [selectedAllergens, setSelectedAllergen] = useState({
        individualAllergens: [{
            individualId: '',
            name: '',
        }],
    });

    let [showAlert, setShowAlert] = useState({
        show: false,
        title: ""
    });

    let { submitPatchOrder } = useSelector((state) => {
        let { submitPatchOrder } = state;
        return {
            submitPatchOrder,
        }
    })

    const handleSearch = async (searchData) => {
        getIndividualAllergen(searchData).then((res) => {
            if (res?.data?.success) {
                setAllergens(res?.data.allergens)
            }
        });
    }

    const handleGroupSearch = async (searchData) => {
        getGroupAllergen(searchData).then((res) => {
            if (res?.data?.success) {
                setGroupAllergens(res?.data.allergens)
            }
        });
    }

    const handleGroupSelect = (id, name, item, e) => {
        const isSelected = e.target.checked;
        if (isSelected) {
            setSelectedGAllergen((prev) => {
                return {
                    gAllergens: [...prev.gAllergens, {
                        groupId: id,
                        groupName: name,
                        allergens: item
                    }]
                }
            })
        } else {
            const filteredArray = selectedGAllergens.gAllergens.findIndex(item => item.groupId === id)
            const newArray = [...selectedGAllergens.gAllergens.slice(0, filteredArray), ...selectedGAllergens.gAllergens.slice(filteredArray + 1)];
            setSelectedGAllergen({
                gAllergens: newArray
            })
        }

    }

    const handleIndividualSelect = (id, item, e) => {
        const isSelect = e.target.checked;
        if (isSelect) {
            setSelectedAllergen((prev) => {
                return {
                    individualAllergens: [...prev.individualAllergens, {
                        individualId: id,
                        name: item,
                    }]
                }
            })
        } else {
            const filteredArray = selectedAllergens.individualAllergens.findIndex(item => item.individualId === id)
            const newArray = [...selectedAllergens.individualAllergens.slice(0, filteredArray), ...selectedAllergens.individualAllergens.slice(filteredArray + 1)];
            setSelectedAllergen({
                individualAllergens: newArray
            })
        }
    }

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        if (selectedAllergens.individualAllergens.length > 1 || selectedGAllergens.length > 1) {
            setAlert({ show: true, title: 'Patch order submitted successfully' });
            dispatch(submitPatchOrderRequest({ patientId: patient, individualAllergen: selectedAllergens, groupAllergen: selectedGAllergens }));
            setTimeout(() => {
                setAlert({ show: submitPatchOrder?.loading, title: '' });
            }, 3000);
            setStartPatch(false)
        } else {
            setShowAlert({ show: true, title: 'Please select required allergens' });
            dispatch(submitPatchOrderRequest({ patientId: patient, individualAllergen: selectedAllergens, groupAllergen: selectedGAllergens }));
            setTimeout(() => {
                setShowAlert({ show: false, title: '' });
            }, 3000);
        }

    }

    const reviewQuestionnaireModel = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    const handleBack = (e) => {
        e.preventDefault();
        setStartPatch(false)
    }

    const handleRemoveGroup = (e, allergen) => {
        const filteredArray = selectedGAllergens.gAllergens.findIndex(item => item.groupId === allergen.groupId)
        const newArray = [...selectedGAllergens.gAllergens.slice(0, filteredArray), ...selectedGAllergens.gAllergens.slice(filteredArray + 1)];
        setSelectedGAllergen({
            gAllergens: newArray
        })
    }

    const handleRemoveIndividual = (e, index) => {
        e.preventDefault();
        const newArray = [...selectedAllergens.individualAllergens.slice(0, index), ...selectedAllergens.individualAllergens.slice(index + 1)];
        setSelectedAllergen({
            individualAllergens: newArray
        })
    }

    return (
        <>
            {openModal && <ReviewQuestionnaire openModal={openModal} setOpenModal={setOpenModal} patientId={patient} />}
            <ToastMessage showAlert={showAlert} />
            <div className="px-[30px]">
                <div className="mb-5 sm:mb-[30px] block sm:flex items-center justify-between">
                    <div onClick={handleBack} className="flex items-center">
                        <IoIosArrowBack className="text-xl md:text-[26px] mr-[10px] md:mr-[14px]" />
                        <h1 className="main-title text-base sm:text-lg">Start Patches</h1>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button type='submit' onClick={reviewQuestionnaireModel} className="btn-theme block sm:inline-block">Review Questionnaire</button>
                        <Button className='btn-theme ml-0 sm:ml-4 mt-2 sm:mt-0 block sm:inline-block' handleSubmitOrder={handleSubmitOrder} isLoading={submitPatchOrder?.isLoading} text="Submit Order" isForm={false} />
                    </div>
                </div>
                <div className="card mb-[30px] p-6">
                    <form class="mb-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7">
                            <div>
                                <label className="form-label mb-3">Search</label>
                                <div className="relative">
                                    <input className="form-control search-bar w-full" onChange={(e) => { e.preventDefault(); handleSearch(e.target.value) }} placeholder="Type here - produces predictive text" />
                                    <img src={searchIcon} alt="patchDX" className="absolute top-[14px] md:top-[19px] left-5 w-[14px]" />
                                </div>
                                {individualAllergens.length>0&&<div className="border border-border-100 p-4 rounded-md mt-[10px] allergen-dropdown max-h-[180px] overflow-y-auto">
                                    <div className="custom-accordian">
                                        <dev className="border-none" collapseAll>
                                            <div className="accordian-btn border-none card p-0 shadow-none">
                                                <div className="px-0 pb-2">
                                                    <div className="">
                                                        {individualAllergens && individualAllergens.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-2 mb-2">
                                                                <Checkbox onChange={(e) => handleIndividualSelect(item._id, item.displayName, e)}
                                                                />
                                                                <Label htmlFor="accept" className="flex">
                                                                    {item.displayName}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </dev>
                                    </div>
                                </div>}
                            </div>
                            <div>
                                <div>
                                    <label className="form-label mb-3">Patch Groups</label>
                                    <div className="relative">
                                        <input onChange={(e) => { e.preventDefault(); handleGroupSearch(e.target.value) }} className="form-control search-bar w-full" placeholder="Type here - produces predictive text" />
                                        <img src={searchIcon} alt="patchDX" className="absolute top-[14px] md:top-[19px] left-5 w-[14px]" />
                                    </div>
                                </div>
                                {groupAllergens.length>0&&<div className="border border-border-100 p-4 rounded-md mt-[10px] allergen-dropdown max-h-[180px] overflow-y-auto">
                                    <div className="custom-accordian">
                                        <Accordion className="border-none" collapseAll>
                                            <div className="accordian-btn border-none card p-0 shadow-none">
                                                <div className="px-0 pb-2">
                                                    {groupAllergens && groupAllergens?.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 mb-2 ">
                                                            <Checkbox onChange={(e) => handleGroupSelect(item._id, item.groupName, item.displayName, e)}
                                                            />
                                                            <Label htmlFor="accept" className="flex">
                                                                {item.groupName}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Accordion>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </form>
                    <div className="mb-10">
                        {selectedAllergens?.individualAllergens?.length > 1 && <h3 className="font-semibold text-base md:text-xl underline mb-5 text-label">Individual Allergens</h3>}
                        {selectedAllergens?.individualAllergens?.length > 1 && <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                            {selectedAllergens?.individualAllergens?.map((allergen, i) => (
                                <>
                                    {allergen.individualId && <div className="flex">
                                        <span className="bg-light-purple border border-primary text-lg rounded px-4 py-2 mr-[10px] flex items-center">1</span>
                                        <div className="border border-border-100 rounded-md p-5 relative w-full">
                                            <p className="text-secondary-text font-medium min-h-fit md:min-h-[50px] flex items-center w-full break-all">{allergen.name}</p>
                                            <IoClose onClick={(e) => handleRemoveIndividual(e, i)} className="text-primary text-xl absolute top-2 right-2 cursor-pointer" />
                                        </div>
                                    </div>}
                                </>
                            ))}
                        </div>}
                    </div>

                    {selectedGAllergens?.gAllergens.map((allergen, index) => (
                        <div key={index} className="mb-10">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="font-semibold text-base md:text-xl underline text-label">{allergen.groupName}</h3>
                                {allergen.groupName !== '' && <p className="flex items-center cursor-pointer" onClick={(e) => handleRemoveGroup(e, allergen)} ><MdDeleteOutline className="text-error text-xl inline-block mr-1" /> <span className="underline text-error">Remove</span></p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
                                {allergen?.allergens?.map((item, i) => (<div className="flex">
                                    <span className="bg-light-purple border border-primary text-lg rounded px-4 py-2 mr-[10px] flex items-center">1</span>
                                    <div key={i} className="border border-border-100 rounded-md p-5 relative w-full">
                                        <p className="text-secondary-text font-medium min-h-fit md:min-h-[50px] flex items-center w-full break-all">{item}</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>))}
                </div>
            </div>
        </>
    )
}

export default StartnewPatchOrder