import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "flowbite-react";
import { Formik, Form, FieldArray, Field } from "formik";
import { IoIosArrowBack } from "react-icons/io";
import moment from "moment";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { fetchVendorOrderTests } from "../../../../service/patch/patch";
import { submitVendorOrderSummary } from "../../../../service/patch/patch";
import { Loader } from "../../../../components";

function EnterPatchResult() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [patientDetail, setPatientDetail] = useState({});
    const [patientId, setPatientId] = useState('')
    let [loading, setLoading] = useState(false);
    const [orderSummaries, setOrderSummaries] = useState([{
        orderId: '',
        createdAt: '',
        patchTests: []
    }]);


    useEffect(() => {
        if (id !== '' && id) {
            setLoading(true);
            fetchVendorOrderTests(atob(id))
                .then((res) => {
                    if (res.data.success) {
                        setPatientDetail(res?.data?.vendorOrders[0]?.patient)
                        divideArrayIntoGroups(res?.data?.vendorOrders)
                        setPatientId(res?.data?.vendorOrders[0]?.patientId)
                        setLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, loading);

    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const divideArrayIntoGroups = (array) => {
        if (array?.length > 0) {
            for (let index = 0; index < array.length; index++) {
                let trueGroupArray = []
                let nonTrueGroupArray = []
                let trueTests = array[index]?.patchTests.filter(item => item.title.includes('T.R.U.E. TEST'));
                let nonTrueTest = array[index]?.patchTests.filter(item => !item.title.includes('T.R.U.E. TEST'));
                if (trueTests?.length > 0) {
                    trueGroupArray = chunk(trueTests, 12);
                }
                if (nonTrueTest?.length > 0) {
                    nonTrueGroupArray = chunk(nonTrueTest, 10);
                }
                const combineArray = trueGroupArray.concat(nonTrueGroupArray);
                if (array[index]?.patchTests) {
                    setOrderSummaries((prev) => {
                        const filterArr = prev.filter(item => item.orderId === array[index]?._id);
                        if (filterArr.length === 0) {
                            return [...prev, {
                                orderId: array[index]?._id,
                                createdAt: array[index]?.createdAt,
                                patchTests: combineArray
                            }]
                        } else {
                            return [{
                                orderId: array[index]?._id,
                                createdAt: array[index]?.createdAt,
                                patchTests: combineArray
                            }]
                        }
                    })
                }
            }
        }
    }

    const onSubmit = (values, actions, index) => {
        const sortedSummeries = orderSummaries[index].patchTests.flatMap((item) => item.map((h) => {
            return h;
        }));
        const queryParam = {
            patientId: patientId,
            orderId: orderSummaries[index]?.orderId
        };
        submitVendorOrderSummary({ queryParam, allergens: sortedSummeries }).then((res) => {
            if (res.data.success) {
                navigate('/clinic/enter-patch-test-results')
            }
        });
    }

    const handlePlusReaction = (setFieldValue, fieldName, i, index) => {
        for (let iIndex = 0; iIndex < orderSummaries.length; iIndex++) {
            orderSummaries[iIndex]?.patchTests.map((item, pI) => {
                if (pI === i) {
                    item[index].reactionDate = Date.now();
                    switch (item[index].reaction) {
                        case '':
                            item[index].reaction = '+/-'
                            setFieldValue(fieldName, '+/-')
                            break;
                        case '+/-':
                            item[index].reaction = '1+'
                            setFieldValue(fieldName, '1+')
                            break;
                        case '1+':
                            item[index].reaction = '2+'
                            setFieldValue(fieldName, '2+')
                            break;
                        case '2+':
                            item[index].reaction = '3+'
                            setFieldValue(fieldName, '3+')
                            break;
                        case '3+':
                            item[index].reaction = ''
                            setFieldValue(fieldName, '')
                            break;
                        default:
                            break;
                    }
                }
                return item;
            })
        }
    }

    const handleMinusReaction = (setFieldValue, fieldName, i, index) => {
        for (let iIndex = 0; iIndex < orderSummaries.length; iIndex++) {
            orderSummaries[iIndex]?.patchTests.map((item, pI) => {
                if (pI === i) {
                    item[index].reactionDate = Date.now();
                    switch (item[index].reaction) {
                        case '':
                            item[index].reaction = ''
                            setFieldValue(fieldName, '')
                            break;
                        case '+/-':
                            item[index].reaction = ''
                            setFieldValue(fieldName, '')
                            break;
                        case '1+':
                            item[index].reaction = '+/-'
                            setFieldValue(fieldName, '+/-')
                            break;
                        case '2+':
                            item[index].reaction = '1+'
                            setFieldValue(fieldName, '1+')
                            break;
                        case '3+':
                            item[index].reaction = '2+'
                            setFieldValue(fieldName, '2+')
                            break;
                        default:
                            break;
                    }
                }
                return item;
            })
        }

    }

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/clinic/enter-patch-test-results')
    }

    return (
        <>
            {loading && <Loader />}
            <div className="px-[30px]">
                <div onClick={(e) => handleBack(e)} className="mb-5 sm:mb-[30px] flex items-center">
                    <IoIosArrowBack className="text-xl sm:text-[26px] mr-[10px] sm:mr-[14px]" />
                    <h1 className="main-title text-base sm:text-lg">Enter Patch Test Results</h1>
                </div>
                <div className="card px-4 md:px-10 py-4 md:py-6 mb-5 sm:mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <p className="text-secondary-text text-sm sm:text-base font-medium">Patient Name : <strong>{patientDetail.firstName} {patientDetail.lastName}</strong></p>
                        <p className="text-secondary-text text-sm sm:text-base font-medium">DOB : <strong>{moment(patientDetail.dateOfBirth).format('MM/DD/YYYY')}</strong></p>
                        <p className="text-secondary-text text-sm sm:text-base font-medium">Phone Number : <strong>{patientDetail.phoneNumber}</strong></p>
                    </div>
                </div>
                {/* <div className="border border-border-100 p-4 rounded-md mt-[10px] allergen-dropdown"> */}
                <div className="">
                    <div className="custom-accordian">
                        <Accordion className="border-none card p-2" collapseAll>
                            {orderSummaries?.map((summary, itemIndex) => (
                                <Accordion.Panel key={itemIndex}>
                                    <div className="border-none">
                                        <Accordion.Title className="bg-transparent hover:bg-transparent focus:ring-opacity-0 px-4 md:px-10 py-3 md:py-4 ">
                                            <div>
                                                <span className="menu-name text-base text-secondary-text">Patch Test({moment(summary.createdAt).format('MM/DD/YYYY')})</span>
                                            </div>
                                        </Accordion.Title>
                                        <Accordion.Content className="py-8 max-h-[calc(100vh-380px)] overflow-y-auto border-t border-color-blue-blue">
                                            <div className="">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Formik
                                                        initialValues={{ summary }}
                                                        onSubmit={(values, actions) => {
                                                            onSubmit(values, actions, itemIndex);
                                                        }}
                                                        enableReinitialize={true}>
                                                        {({ errors, values, setFieldValue }) => (
                                                            <Form>
                                                                <div className="">
                                                                    {summary?.patchTests?.map((order, i) => (
                                                                        <div key={i} className="mb-10">
                                                                            <h3 className="font-semibold text-lg underline mb-5 text-label">Panel {i + 1}</h3>
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                                                                                <FieldArray
                                                                                    name='order'
                                                                                    render={() => (
                                                                                        <>
                                                                                            {order?.map((item, index) => (
                                                                                                <div key={index} className="flex">
                                                                                                    <span className="bg-light-purple border border-primary text-lg rounded px-4 py-2 mr-[10px] flex items-center">{index + 1}</span>
                                                                                                    <div className="border border-border-100 rounded-md p-5 relative w-full block sm:flex justify-between items-center gap-2">
                                                                                                        <p className="text-secondary-text font-medium min-h-fit  sm:min-h-[50px] w-full flex items-center text-sm flex-1 mb-3 sm:mb-0">{item.title}</p>
                                                                                                        <div className="flex items-center border border-primary rounded-md overflow-hidden w-fit">
                                                                                                            <span onClick={() => handleMinusReaction(setFieldValue, `order[${index}]`, i, index)} className="bg-input-bg py-4 px-2 text-sm cursor-pointer"><FaMinus /></span>
                                                                                                            <Field value={order[index].reaction} name={order[index].reaction} type="text" className="px-3 text-lg text-secondary-text w-10 text-center border-0" disabled />
                                                                                                            <span onClick={() => handlePlusReaction(setFieldValue, `${item.title}${item.reaction}`, i, index)} className="bg-input-bg py-4 px-2 text-sm cursor-pointer"><FaPlus /></span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>))}
                                                                                        </>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="text-end mt-[30px]">
                                                                    <button className="btn-theme">Submit Results</button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </Accordion.Content>
                                    </div>
                                </Accordion.Panel>
                            ))}
                        </Accordion>
                    </div>
                </div>
                {/* </div> */}
            </div >
        </>
    )
}

export default EnterPatchResult