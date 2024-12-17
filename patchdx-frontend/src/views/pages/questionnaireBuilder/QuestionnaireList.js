import React, { useEffect } from 'react'
import editIcon from '../../../assets/images/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getQuestionnaireRequest } from "../../../redux/module/questionnaire/action";
import { Loader } from "../../../components";

function QuestionnaireList() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { getQuestionnaire } = useSelector((state) => {
        let { getQuestionnaire } = state;
        return {
            getQuestionnaire,
        }
    })

    useEffect(() => {
        dispatch(getQuestionnaireRequest())
    }, [dispatch, getQuestionnaire?.data?.success])

    const handleSubmit = () => {
        navigate("/clinic/questionnaire-builder");
    }

    const handleEdit= (id) => {
        navigate(`/clinic/questionnaire-builder/?${id}`);
    }


    return (
        <>
        {getQuestionnaire?.loading && <Loader isLoading={getQuestionnaire?.loading} />}
        <div className="px-[30px]">
            <div className="mb-5 sm:mb-[30px] block sm:flex items-center justify-between">
                <h1 className="main-title text-base sm:text-lg">Questionnaire List</h1>
                <button type='submit' onClick={handleSubmit} className="btn-theme mt-2 sm:mt-0">Add Questionnaire Template</button>
            </div>
            <ul>
                {getQuestionnaire?.data?.length > 0 && getQuestionnaire.data.map((questionnaire, index) => (
                    <li key={index} className="flex items-center justify-between shadow-full rounded-[10px] px-4 py-4 mb-6">
                        <span className="text-base sm:text-lg font-medium text-primary">{questionnaire.formName}</span>
                        <img onClick={(e)=>{e.preventDefault(); handleEdit(questionnaire._id)}} src={editIcon} alt="icon" className="w-5 cursor-pointer"></img>
                    </li>
                ))}
            </ul>
        </div >
        </>
        
    )
}

export default QuestionnaireList