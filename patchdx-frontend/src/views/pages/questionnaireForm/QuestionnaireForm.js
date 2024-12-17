import { useState, useEffect } from 'react'
import { Formik, Form, FieldArray, Field } from "formik";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getQuestionnaireForm, checkQuestionnaireExist, checkResponseExist } from "../../../service/questionnaire/Questionnaire";
import { submitQuestionnaireFormRequest } from "../../../redux/module/questionnaire/action";
import { Button, Loader } from "../../../components";
import getUrlData from "../../../utils/getUrlData";
import completed from '../../../assets/images/completed.png'

export default function QuestionnaireForm() {
    let dispatch = useDispatch();
    const location = useLocation();
    const [patientId, setPatientId] = useState('');
    const [isExist, setExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questionnaireId, setQuestionnaireId] = useState('');
    let [questionnaireForm, setQuestionnaireForm] = useState([]);
    let [title, setTitle] = useState('');

    useEffect(() => {
        const { patientId, questionnaireId } = getUrlData(location);
        if (questionnaireId)
            setLoading(true);
        checkResponseExist({ patientId, questionnaireId }).then((response) => {
            if (response.data.success) {
                setExist(true);
            } else {
                setExist(false);
                getQuestionnaireForm(questionnaireId)
                    .then((res) => {
                        setPatientId(patientId)
                        setQuestionnaireId(questionnaireId)
                        setTitle(res?.data?.data?.formName)
                        setQuestionnaireForm(res?.data?.data?.fields)
                    })
                    .catch((err) => console.log(err));
            }
            setLoading(false);
        })
    }, [])

    const onSubmit = async (values) => {
        const reformValues = {
            patientId: patientId,
            questionnaireId: questionnaireId,
            question: [],
            answer: []
        }
        const formValues = values.questionnaireForm;
        formValues.map((values) => {
            if (values) {
                const questionValue = Object.keys(values)[0]
                const answerValue = Object.values(values)[0]
                reformValues.question = [...reformValues.question, questionValue];
                reformValues.answer = [...reformValues.answer, answerValue];
            }

            return values;
        })
        await dispatch(submitQuestionnaireFormRequest(reformValues));
        setExist(true);
    }

    const handleChangeForm = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    const RenderFormControlls = (d, setFieldValue, i, values) => {
        switch (d.inputType) {
            case "text":
                return (
                    <>
                        <div className="mb-5">
                            <label className="form-label mb-3">{d.label}</label>
                            <Field
                                id={d.fieldName}
                                required
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder={d.placeholder}
                                type='text'
                                onChange={(e) => { handleChangeForm(e, setFieldValue) }}
                                name={`questionnaireForm[${i}].${d.label}`}
                            />
                        </div>
                    </>
                );
            case "number":
                return (
                    <>
                        <div className="mb-5">
                            <label className="form-label mb-3">{d.label}</label>
                            <Field
                                id={d.fieldName}
                                required
                                className="form-control w-full bg-transparent border border-color-blue"
                                placeholder={d.placeholder}
                                type='number'
                                onChange={(e) => { handleChangeForm(e, setFieldValue) }}
                                name={`questionnaireForm[${i}].${d.label}`}
                            />
                        </div>
                    </>
                );
            case 'textarea':
                return (
                    <div className="mb-5">
                        <label className="form-label mb-3">{d.label}</label>
                        <Field
                            id={d.fieldName}
                            required
                            className="form-control w-full bg-transparent border border-color-blue textarea-box"
                            placeholder={d.placeholder}
                            component='textarea'
                            onChange={(e) => handleChangeForm(e, setFieldValue)}
                            name={`questionnaireForm[${i}].${d.label}`}
                        />
                    </div>
                )
            case "date":
                return (
                    <div className="mb-5">
                        <label className="form-label mb-3">{d.label}</label>
                        <Field
                            required
                            id={d.fieldName}
                            className="form-control w-full bg-transparent border border-color-blue"
                            placeholder={d.placeholder}
                            type='date'
                            onChange={(e) => handleChangeForm(e, setFieldValue)}
                            rows={2}
                            name={`questionnaireForm[${i}].${d.label}`}
                        />
                    </div>
                );
            case "radiogroup":
                return (
                    <div className="mb-5">
                        <label className="form-label mb-3">{d.label}</label>
                        {d?.options.map((o, index) => (
                            <>
                                <input
                                    required
                                    id={o.label}
                                    type='radio'
                                    name={`questionnaireForm[${i}].${d.label}`}
                                    value={o.value}
                                    onChange={(e) => {
                                        handleChangeForm(e, setFieldValue)
                                    }}
                                />
                                <label className="ml-2 mr-6">{o.label}</label>
                            </>)
                        )}
                    </div>
                );
            default:
                return <></>
        }
    }

    return (
        <>
            {loading && < Loader />}
            <Formik
                initialValues={questionnaireForm}
                resetForm
                onSubmit={(values) => {
                    onSubmit(values);
                }}
                enableReinitialize={true}
            >
                {({ errors, values, setFieldValue }) => (
                    <div className="p-10 mx-10 my-6 max-w-[60%] mx-auto">
                        <div>
                            <div className="mb-5">
                                <h1 className="main-title text-2xl">{title}</h1>
                            </div>
                            {!loading && <div className="card p-6">
                                {!isExist && <Form>
                                    <FieldArray
                                        name='questionnaireForm'
                                        render={() => (
                                            <div className="grid grid-cols-12 gap-4">
                                                {values?.map((d, i) => (
                                                    <div key={i} className="col-span-12">
                                                        {RenderFormControlls(d, setFieldValue, i, values)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    />
                                    {
                                        values?.length > 0 && <div className="mt-16 text-end">
                                            <Button isForm={true} className='btn-theme' text="Save" />
                                        </div>
                                    }
                                </Form>}
                                {isExist && <div className="text-center">
                                    <img src={completed} alt="" className="w-48 mx-auto mb-4"></img>
                                    <h3 className="text-4xl font-semibold mb-4">Thank you</h3>
                                    <p className="text-base text-black">Your questionnaire has been successfully completed.</p>
                                </div>}
                            </div>}
                        </div>
                    </div>
                )}
            </Formik >
        </>
    );
}