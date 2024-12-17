import React, { useEffect, useState } from 'react'
import { Accordion } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { IoIosArrowBack } from "react-icons/io";
import { Tabs } from "flowbite-react";
import { fetchPatchOrders, fetchPatchTestResults } from "../../../../service/patch/patch";
import { Loader } from "../../../../components";

function PatientInfo() {
    let navigate = useNavigate();
    let location = useLocation();
    const [patchOrders, setPatchOrder] = useState([]);
    const [patchTests, setPatchTests] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.search !== '') {
            setLoading(true);
            fetchPatchOrders(location.search.split("?")[1])
                .then((res) => {
                    if (res.data.success) {
                        setPatchOrder(res?.data?.patchOrders);
                    }
                })
                .catch((err) => console.log(err));
            fetchPatchTestResults(location.search.split("?")[1])
                .then((res) => {
                    if (res.data.success) {
                        setPatchTests(res?.data?.vendorOrders);
                        setLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const divideArrayIntoGroups = (array) => {
        if (array?.patchTests.length > 0) {
            let trueGroupArray = []
            let nonTrueGroupArray = []
            let trueTests = array?.patchTests.filter(item => item.title.includes('T.R.U.E. TEST'));
            let nonTrueTest = array?.patchTests.filter(item => !item.title.includes('T.R.U.E. TEST'));
            if (trueTests?.length > 0) {
                trueGroupArray = chunk(trueTests, 12);
            }
            if (nonTrueTest?.length > 0) {
                nonTrueGroupArray = chunk(nonTrueTest, 10);
            }
            const combineArray = trueGroupArray.concat(nonTrueGroupArray);
            return combineArray;
        }
    }

    const handleBack = () => {
        navigate('/clinic/patient')
    }

    const handleVendorOrder = (id, orderId) => {
        navigate(`/clinic/document-vendor-order?patientId=${id}&patchOrderId=${orderId}`)
    }

    return (
        <>
            {loading && <Loader />}
            <div className="px-[30px]">
                <div onClick={handleBack} className="mb-[30px] flex items-center">
                    <IoIosArrowBack className="text-[26px] mr-[14px]" />
                    <h1 className="main-title">Back to Patient Selection</h1>
                </div>
                {patchOrders?.length > 0 && <div className="card px-10 py-6 mb-10">
                    <div className="grid grid-cols-3 gap-3">
                        <p className="text-secondary-text font-medium">Patient Name : <strong> {patchOrders[0].patient.firstName} {patchOrders[0].patient.lastName}</strong></p>
                        <p className="text-secondary-text font-medium">DOB : <strong>{moment(patchOrders[0].patient.dateOfBirth).format('MM/DD/YYYY')}</strong></p>
                        <p className="text-secondary-text font-medium">Phone Number : <strong>{patchOrders[0].patient.phoneNumber}</strong></p>
                    </div>
                </div>}
                <Tabs variant="underline">
                    <Tabs.Item active title="View Patch Test Orders">
                        <div className="custom-accordian mt-4">
                            <Accordion className="border-none" collapseAll>
                                {patchOrders?.map((patch, i) => (
                                    <Accordion.Panel key={i}>
                                        <div className="border-none card p-0">
                                            <Accordion.Title className="bg-transparent px-10 py-6 hover:bg-transparent focus:ring-opacity-0">
                                                <div>
                                                    <span className="menu-name text-base font-semibold text-secondary-text">Patch Order <span className="text-primary">({moment(patch.createdAt).format('MM/DD/YYYY')})</span></span>
                                                </div>
                                            </Accordion.Title>
                                            <Accordion.Content className="border-t border-color-blue-blue py-8 mx-10 pr-2 max-h-[calc(100vh-450px)] overflow-y-auto">
                                                <div className="mb-9">
                                                    <h3 className="text-label text-base font-semibold mb-5">Allergens Groups in this Order:</h3>
                                                    <ul className="list-disc pl-5">
                                                        {patch?.groupNames.map((allergen, i) => (
                                                            <>
                                                                {allergen?.allergens.map((item, i) => (
                                                                    <li key={i} className="text-value text-sm font-medium mb-3">{item}</li>
                                                                ))}
                                                            </>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {patch?.individualAllergens.length > 0 && <div>
                                                    <h3 className="text-label text-base font-semibold mb-5">Individual Allergens in this Order:</h3>
                                                    <ul className="list-disc pl-5">
                                                        {patch?.individualAllergens.map((allergen, i) => (
                                                            <li className="text-value text-sm font-medium mb-3">{allergen.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>}
                                                <div className="flex justify-between items-center mt-7">
                                                    <span className="text-danger font-semibold text-base">No Vendor order has been submitted yet</span>
                                                    <button onClick={() => handleVendorOrder(patchOrders[0].patient._id, patch._id)} className="btn-theme">Document vendor order</button>
                                                </div>
                                                {patch?.orderSummeries && <div className="mt-9">
                                                    <h3 className="text-label text-base font-semibold mb-6">Vendor order submitted {moment(patch?.orderSummeries.createdAt).format('MM/DD/YYYY')}</h3>
                                                </div>}
                                                <div className="mt-9">
                                                    {patch?.orderSummeries && <h3 className="text-label text-base font-semibold mb-6">Number of Allergens in Test : {patch?.orderSummeries.patchTests.length}</h3>}
                                                    {divideArrayIntoGroups(patch?.orderSummeries)?.map((order, i) => {
                                                        return (<div key={i} className="mb-10">
                                                            <h3 className="font-semibold text-lg underline mb-5 text-label">Panel {i + 1}</h3>
                                                            <div className="grid grid-cols-2 gap-[30px]">
                                                                {order?.map((item, i) => (<div key={i} className="flex">
                                                                    <span className="bg-light-purple border border-primary text-lg rounded px-4 py-2 mr-[10px] flex items-center">{i + 1}</span>
                                                                    <div className="border border-border-100 rounded-md p-5 relative w-full">
                                                                        <p className="text-secondary-text font-medium min-h-[50px] w-full flex items-center">{item.title}</p>
                                                                    </div>
                                                                </div>))}
                                                            </div>
                                                        </div>)
                                                    })}
                                                </div>
                                            </Accordion.Content>
                                        </div>
                                    </Accordion.Panel>
                                ))}
                            </Accordion>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item title="View Patch Test Results">
                        <div className="custom-accordian mt-4">
                            <Accordion className="border-none" collapseAll>
                                {patchTests?.map((test, i) => (
                                    <Accordion.Panel key={i}>
                                        <div className="border-none card p-0 mb-10">
                                            <Accordion.Title className="bg-transparent px-10 py-6 hover:bg-transparent focus:ring-opacity-0">
                                                <div>
                                                    <span className="menu-name text-base font-semibold text-secondary-text">Visit Date <span className="text-primary">({moment(test.updatedAt).format('MM/DD/YYYY')})</span></span>
                                                </div>
                                            </Accordion.Title>
                                            <Accordion.Content className="border-t border-color-blue-blue py-8 mx-10 px-0">
                                                <div className="custom-table overflow-x-auto shadow-full max-h-[calc(100vh-450px)] overflow-y-auto">
                                                    <table class="w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>Allergen Name</th>
                                                                <th className="text-center">Reaction</th>
                                                                <th className="text-center">Date of Reaction</th>
                                                                <th className="text-center">Clinically Relevant</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {test.patchTests?.map((test, i) => (
                                                                <tr key={i}>
                                                                    <td className="normal-space">{test.title}</td>
                                                                    <td className="bg-hightlight-green text-center">{test.reaction}</td>
                                                                    <td className="bg-hightlight-purple text-center">{test.reactionDate ? moment(test.reactionDate).format('MM/DD/YYYY') : ''}</td>
                                                                    <td className="text-center">Yes</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Accordion.Content>
                                        </div>
                                    </Accordion.Panel>
                                ))}
                            </Accordion>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item title="View Letters and Materials">
                        <div className="custom-accordian">

                        </div>
                    </Tabs.Item>
                    <Tabs.Item title="Addend/Modify Patient Data (future)">
                        <div className="custom-accordian">
                        </div>
                    </Tabs.Item>
                </Tabs>
            </div>
        </>
    )
}

export default PatientInfo