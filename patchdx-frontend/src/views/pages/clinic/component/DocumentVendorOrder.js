import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Checkbox, Label, Textarea } from "flowbite-react";
import { TRUE_TEST, IGNORE_ITEM } from "../../../../Constants";
import { submitVendorOrderSummary } from "../../../../service/patch/patch";

const checkValue = {
    Panel1: 'Panel 1',
    Panel2: 'Panel 2',
    Panel3: 'Panel 3',
    Panel4: 'Panel 4',
    Panel5: 'Panel 5',
    Panel6: 'Panel 6',
    Panel7: 'Panel 7',
    Panel8: 'Panel 8',
    Panel9: 'Panel 9',
    Panel10: 'Panel 10',
    Panel11: 'Panel 11',
    Panel12: 'Panel 12',
    Panel13: 'Panel 13',
    Panel14: 'Panel 14',
    Panel15: 'Panel 15',
    Panel16: 'Panel 16',
    Panel17: 'Panel 17',
    Panel18: 'Panel 18',
    Panel19: 'Panel 19',
    Panel20: 'Panel 20',
    Panel21: 'Panel 21',
    Panel22: 'Panel 22',
    Panel23: 'Panel 23',
    Panel24: 'Panel 24',
    Panel25: 'Panel 25',
    Panel26: 'Panel 26',
    Panel27: 'Panel 27',
    Panel28: 'Panel 28',
    Panel29: 'Panel 29',
    Panel30: 'Panel 30',
    Panel31: 'Panel 31',
    Panel32: 'Panel 32',
    Panel33: 'Panel 33',
    Panel34: 'Panel 34',
    Panel35: 'Panel 35',
    Panel36: 'Panel 36',
    Panel37: 'Panel 37',
    Panel38: 'Panel 38',
    Panel39: 'Panel 39',
    Panel40: 'Panel 40',
    Panel41: 'Panel 41',
    Panel42: 'Panel 42',
    Panel43: 'Panel 43',
    Panel44: 'Panel 44',
    Panel45: 'Panel 45',
    Panel46: 'Panel 46',
    Panel47: 'Panel 47',
    Panel48: 'Panel 48',
    Panel49: 'Panel 49',
    Panel50: 'Panel 50',
}


function DocumentVendorOrder() {
    let location = useLocation();
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [allergens, setAllergens] = useState([]);
    const [queryParam, setQueryParams] = useState({
        patientId: '',
        patchOrderId: '',
    });
    let formvalues = {
        isCheck: false,
        testAllergen: '',
    }

    useEffect(() => {
        const patId = searchParams.get('patientId');
        const orderId = searchParams.get('patchOrderId');
        if (patId && orderId) {
            setQueryParams({ patientId: patId, patchOrderId: orderId });
        }
    }, []);

    const onRandom = (values) => {
        if (queryParam.patientId !== '' && queryParam.patchOrderId !== '') {
            const allergensArr = values.testAllergen.split("\n");
            for (let index = 0; index < allergensArr.length; index++) {
                getAllergenFromPlainText(allergensArr[index], index, allergensArr)
            }
            let trueTestArray = []
            if (values.isCheck) {
                trueTestArray = TRUE_TEST.split("\n")
            }
            const combinedArray = trueTestArray.concat(allergens)
            submitVendorOrderSummary({ queryParam, allergens: combinedArray }).then((res) => {
                if (res.data.success) {
                    navigate(`/clinic/patient-info?${queryParam.patientId}`);
                }
            });
        }
    };

    const getAllergenFromPlainText = (textValue, index, array) => {
        switch (textValue) {
            case checkValue.Panel1:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel2) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel2:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel3) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel3:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel4) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel4:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel5) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel5:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel6) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel6:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel7) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel7:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel8) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel8:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel9) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel9:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel10) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel10:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel11) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel11:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel12) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel12:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel13) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel13:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel14) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel14:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel15) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel15:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel16) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel16:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel17) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel17:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel18) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel18:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel19) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel19:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel20) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel20:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel21) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel21:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel22) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel22:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel23) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel23:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel24) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel24:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel25) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel25:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel26) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel26:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel27) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel27:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel28) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel28:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel29) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            case checkValue.Panel29:
                for (let i = index; i < array.length; i++) {
                    if (array[i + 1] === checkValue.Panel30) break;
                    if (array[i + 1] === ' ') break;
                    if (array[i + 1] === 'Print Go Back') break;
                    if (array[i + 1] !== IGNORE_ITEM.trueTest && array[i + 1] !== IGNORE_ITEM.nonTrueTest) allergens.push(array[i + 1])
                }
                break;
            default:
                break;
        }
    }

    const handleAllergensValues = (setFieldValue, fieldName, values) => {
        setFieldValue(fieldName, values)
    }

    const handleSubmitCheck = (setFieldValue, fieldName, fieldName1, value, setFieldError) => {
        if (!value.isCheck) {
            setFieldValue(fieldName, TRUE_TEST)
            setFieldValue(fieldName1, true)
        } else {
            setFieldValue(fieldName, '')
            setFieldValue(fieldName1, false)
        }
    }


    const handleBack = () => {
        navigate(`/clinic/patient-info?${queryParam.patientId}`);
    }

    return (
        <div className="px-[30px]">
            <div className="mb-[30px]">
                <div onClick={handleBack} className="flex items-center">
                    <IoIosArrowBack className="text-[26px] mr-[14px]" />
                    <h1 className="main-title">Document vendor order</h1>
                </div>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={formvalues}
                onSubmit={(values) => {
                    onRandom(values);
                }}
                validationSchema={Yup.object().shape({
                    testAllergen: Yup.string().required("Please paste the vendor order summary or select the true test"),
                })}>
                {({ errors, values, setFieldValue, setFieldError }) => (
                    <Form>
                        <div className="card mb-[30px] p-6">
                            <div className="flex items-center gap-2 mr-6">
                                <Field type='checkbox' id='isCheck' name='isCheck' onChange={(e) => handleSubmitCheck(setFieldValue, 'testAllergen', 'isCheck', values, setFieldError)} />
                                <Label htmlFor="accept" className="flex text-secondary-text text-lg font-medium">
                                    Using True Test
                                </Label>
                            </div>
                            <Textarea value={values.testAllergen} id='testAllergen' name='testAllergen' onChange={(e) => handleAllergensValues(setFieldValue, 'testAllergen', e.target.value)} placeholder="Paste Vendor Order Summary..." rows={20} className="bg-transparent border-none p-0 mt-10 resize-none rounded-none focus:ring-transparent text-base" />
                        </div>
                        <div className="error-message text-error">
                            {values?.isCheck || (values?.testAllergen.length === 0 && values?.testAllergen === '') && <ErrorMessage name="testAllergen" />}
                        </div>
                        <div className="text-end">
                            <button className="btn-theme">Convert to PatchDX Patient Order</button>
                        </div>
                    </Form>)}
            </Formik>
        </div>
    )
}

export default DocumentVendorOrder