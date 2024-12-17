import React, { useEffect, useState } from 'react'
import editIcon from '../../../assets/images/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import { fetchLetterTemplate } from "../../../service/letterTemplate/letterTemplate";

function LetterBuilderList() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [templateData, setTemplateData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchLetterTemplate().then((res) => {
            if (res.status === 200) {
                setTemplateData(res.data)
                setLoading(false);
            }
        })
    }, [])

    const handleSubmit = () => {
        navigate("/clinic/letter-builder");
    }

    const handleEdit = (id) => {
        navigate(`/clinic/letter-builder/${btoa(id)}`);
    }


    return (
        <>
            {loading && <Loader />}
            <div className="px-[30px]">
                <div className="mb-[30px] flex items-center justify-between">
                    <h1 className="main-title">Template List</h1>
                    <button type='submit' onClick={handleSubmit} className="btn-theme">Add Template</button>
                </div>
                <ul>
                    {templateData?.map((item, i) => (
                        <li key={i} className="flex items-center justify-between shadow-full rounded-[10px] px-4 py-4 mb-6">
                            <span className="text-lg font-medium text-primary">{item.templateName}</span>
                            <img onClick={(e)=> {e.preventDefault();handleEdit(item._id)}} src={editIcon} alt="icon" className="w-5 cursor-pointer"></img>
                        </li>
                    ))}
                </ul>
            </div >
        </>
    )
}

export default LetterBuilderList