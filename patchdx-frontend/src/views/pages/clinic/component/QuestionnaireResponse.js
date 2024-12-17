import React, { useState, useEffect } from 'react';
import { Accordion } from "flowbite-react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import { getPatientQuestionnaires } from "../../../../service/questionnaire/Questionnaire";
import { Loader } from "../../../../components";

function QuestionnaireResponse({ }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let [questionsData, setQuestionsData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id!=='' && id) {
      setLoading(true);
      getPatientQuestionnaires(atob(id))
        .then((res) => {
          if (res.data.success) {
            setQuestionsData(res?.data?.data);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleBack = () => {
    navigate('/clinic/patient')
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full sm:w-[calc(100%-350px)] xl:w-[calc(100%-410px)] h-screen overflow-y-auto">
        <div className="px-[30px]">
          <div onClick={handleBack} className="mb-[30px] flex items-center">
            <IoIosArrowBack className="text-[26px] mr-[14px]" />
            <h1 className="main-title">Review Questionnaire Response</h1>
          </div>
          <div className="custom-accordian">
            <Accordion className="border-none" collapseAll>
              {questionsData?.map((question, i) => (
                <Accordion.Panel>
                  <div className="border-none card p-0 mb-10">
                    <Accordion.Title className="bg-transparent px-10 py-6 hover:bg-transparent focus:ring-opacity-0">
                      <div>
                        <span className="menu-name text-base xl:text-xl font-semibold text-secondary-text">{question.questionnaire.formName}</span>
                      </div>
                    </Accordion.Title>
                    <Accordion.Content className="border-t border-color-blue-blue py-8 mx-10 px-0">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="item">
                          <p className="label">Sent Date</p>
                          <span className="value">{moment(question.questionnaireRecord[0].createdAt).format('MM-DD-YYYY')}</span>
                        </div>
                        <div className="item">
                          <p className="label">Responded Date</p>
                          <span className="value">{moment(question.questionnaireRecord[0].updatedAt).format('MM-DD-YYYY')}</span>
                        </div>
                        {question?.patientResponse.map((item, i) => (
                          <div className="item" key={i}>
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
        </div>
      </div>
    </>
  )
}

export default QuestionnaireResponse