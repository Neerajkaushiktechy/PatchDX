import { useState } from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { DynamicControl } from "./DynamicControl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitCustomFormRequest } from "../../../../redux/module/questionnaire/action";
import { ToastMessage, Button } from "../../../../components";

export const DynamicFormComponent = ({ fields, setfieldsArray, type, formName, setshow, show, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false, checkFormType, customFormId, seteditOpenCustomForm, seteditCustomForm, location, copyTemplatePopup }) => {
  const formMethods = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { submitCustomForm } = useSelector((state) => {
    let { submitCustomForm } = state;
    return {
      submitCustomForm,
    }
  })
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  const [roleId, setRoleId] = useState(undefined)
  const {
    handleSubmit, reset,
    formState: { isSubmitting, errors }
  } = formMethods;


  async function onSubmit(data, error) {

    if (checkAssignment) { return false }
    let formData = [...fields];
    for (let [key, value] of Object.entries(data)) {
      for (var i = 0; i < formData.length; i++) {
        if (formData[i].id === key) {
          formData[i]['defaultValue'] = value
        }
      }

    }

    let customFormDataObject = {
      customFormId,
      formData,
      formName: formName,
      patientId: patientId,
      submittedTime: submittedTime,
      assignmentId: assignmentId,
      studentAssignmentSatusId: assessmentId
    }
    await dispatch(submitCustomFormRequest(customFormDataObject))
    setShowAlert({ show: true, title: "Questionnaire saved successfully" })
    navigate('/clinic/questionnaire-list')
  }
  const handleEditForm = async (id) => {
    setfieldsArray((prev) => {
      let updateArray = [...prev?.fields]

      let findIndex = updateArray?.findIndex((item) => item?.id === id)
      if (findIndex !== -1) {
        const newArray = [...updateArray.slice(0, findIndex), ...updateArray.slice(findIndex + 1)];
        updateArray[findIndex] = newArray
      }
      return {
        ...prev,
        fields: updateArray
      }
    })
  }
  return (
    <>
      <ToastMessage showAlert={showAlert} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <div className="grid grid-cols-12 gap-4">
            {fields?.map((d, i) => (

              <div className="col-span-12 md:col-span-6 mb-5">
                <label className="form-label mb-3">{d.label}</label>
                <DynamicControl {...d} show={show} checkFormType={checkFormType} customFormId={customFormId} handleEditForm={handleEditForm} />
              </div>

            ))}
          </div>
        </FormProvider>
        {fields?.length > 0 && !show && <div className="mt-16">
          <button type="submit" className="btn-theme btn-border" onClick={() => setshow(true)}>Preview</button>
          <Button className='btn-theme ml-[30px]' isLoading={submitCustomForm?.isLoading} text={customFormId !== "" && customFormId !== undefined ? "Update" : "Save"} isForm={true} />
          {/* <button type="submit" className="btn-theme ml-[30px]">
            <Spinner aria-label="Alternate spinner button example" size="sm" />
            </button> */}
        </div>}
      </form>
    </>
  );
}