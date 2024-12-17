import { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import editIcon from '../../../../assets/images/edit.svg'
import { DynamicFormComponent } from './DynamicFormComponent'
import CreateFormName from './CreateFormName';
import { getSingleQuestionnaire } from "../../../../service/questionnaire/Questionnaire";
import ModelPopup from '../../../../components/model/ModelPopup'
import LeftSideWrapper from './LeftsideWrapper'
import { useLocation, useNavigate } from 'react-router-dom';
//import { getSingleCustomForm } from "../../utils/api"
export default function CreateDynamicForm() {

  const [fieldsArray, setfieldsArray] = useState({
    formName: "",
    fields: [],
    customFormId: ""
  });
  const [copyfieldsArray, setcopyfieldsArray] = useState({
    formName: "",
    fields: [],
    customFormId: ""
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [id, setId] = useState('');
  const [previewPopup, setpreviewPopup] = useState(false);
  const [editCustomForm, seteditCustomForm] = useState({});
  const [copyTemplatePopup, setcopyTemplatePopup] = useState(false);
  const [createFormPopup, setcreateFormPopup] = useState(false);
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  useEffect(() => {
    if (location.search !== '')
      getSingleQuestionnaire(location.search.split("?")[1])
        .then((res) => {
          setfieldsArray((prev) => {
            return {
              ...prev,
              formName: res?.data?.data?.formName,
              fields: res?.data?.data?.fields,
              customFormId: res?.data?.data?._id
            }
          })

        })
        .catch((err) => console.log(err));
  }, [])

  const handleBack = async () => {
    navigate('/clinic/questionnaire-list')
  }

  const handleOpenForm = async () => {
    setcreateFormPopup(true);
  }

  return (
    <>
      <div className="flex">
        <div className="px-[30px]">
          <div onClick={handleBack} className="mb-5 sm:mb-[30px] flex items-center">
            <IoIosArrowBack className="text-xl md:text-[26px] mr-[10px] md:mr-[14px]" />
            <h1 className="main-title text-base sm:text-lg">Add Questionnaire</h1>
          </div>

          <div className="shadow-shadow-light rounded-[10px] px-4 py-6 mb-6">
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-b-color-blue">
              <span className="text-base md:text-xl font-medium text-primary">{fieldsArray.formName}</span>
              <img onClick={handleOpenForm} src={editIcon} alt="icon" className="w-4 sm:w-7"></img>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7">
                <DynamicFormComponent show={previewPopup} fields={fieldsArray.fields} formName={fieldsArray.formName} setfieldsArray={setfieldsArray} setshow={setpreviewPopup} customFormId={fieldsArray?.customFormId} seteditOpenCustomForm={() => { setshow(true); setId('') }} seteditCustomForm={seteditCustomForm} location={location} copyTemplatePopup={copyTemplatePopup} />
              </div>
              <LeftSideWrapper setfieldsArray={setfieldsArray} fieldsArray={fieldsArray} customFormId={fieldsArray?.customFormId} location={location} show={show} setshow={setshow} id={id} setId={setId} editCustomForm={editCustomForm} seteditCustomForm={seteditCustomForm} setcopyfieldsArray={setcopyfieldsArray} setcopyTemplatePopup={setcopyTemplatePopup} copyTemplatePopup={copyTemplatePopup} setShowAlert={setShowAlert} />
            </div>
          </div>
        </div>
      </div>
      {
        previewPopup && <ModelPopup view="" classField="form_filled_preview modal_poppup" height="70%" type="assignment" show={previewPopup} setshow={setpreviewPopup} childern={<DynamicFormComponent fields={fieldsArray.fields} formName={fieldsArray.formName} setfieldsArray={setfieldsArray} show={previewPopup} setshow={setpreviewPopup} />} />
      }
      {
        createFormPopup &&
        <ModelPopup classField="modal_poppup" width="40%" view="" height="auto" type="assignment" show={createFormPopup} childern={<CreateFormName fieldsArray={fieldsArray} setfieldsArray={setfieldsArray} setcreateFormPopup={setcreateFormPopup} />} />
      }
    </>
  )
}
