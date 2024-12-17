import React, { useEffect, useState } from 'react'
import { Accordion } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import { getPatientQuestionnaires } from "../../../../service/questionnaire/Questionnaire";
import { CenterLoader } from "../../../../components";

function ReviewQuestionnaire({ openModal, setOpenModal, patientId }) {
    let navigate = useNavigate();
    let [questionsData, setQuestionsData] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        if (patientId)
            setLoading(true);
            getPatientQuestionnaires(patientId)
                .then((res) => {
                    if (res.data.success) {
                        setQuestionsData(res?.data?.data);
                        setLoading(false);
                    }
                })
                .catch((err) => console.log(err));
    }, [])

    // const handleBack = () => {
    //     setPatientInfo(false);
    //     navigate('/patient')
    // }
    return (
        <>
            <Modal show={openModal} size="6xl" onClose={() => setOpenModal(false)}  >
                <Modal.Header>Review Questionnaire</Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="custom-accordian">
                        {loading&&<CenterLoader/>}
                        <Accordion className="border-none" collapseAll>
                        {questionsData.map((question, i) => (
                            <Accordion.Panel key={i}>
                                    <div className="border-none card p-0 mb-6">
                                        <Accordion.Title className="bg-transparent px-6 py-6 hover:bg-transparent focus:ring-opacity-0">
                                            <div>
                                                <span className="menu-name text-base xl:text-lg font-semibold text-secondary-text">{question.questionnaire.formName}</span>
                                            </div>
                                        </Accordion.Title>
                                        <Accordion.Content className="border-t border-color-blue-blue py-8 mx-6 px-0">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {question?.patientResponse.map((item,i) => (
                                                    <div key={i} className="item">
                                                        <p className="label">{item.question}</p>
                                                        <span className="value">{item.answer}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Accordion.Content>
                                    </div>
                            </Accordion.Panel>
                             ))}
                        </Accordion>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ReviewQuestionnaire