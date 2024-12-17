import { combineReducers } from "redux";
import { submitCustomForm, postCustomForm, getQuestionnaire, submitQuestionnaireForm } from "./module/questionnaire/reducer"
import { submitPatientForm, getPatients } from "./module/patient/reducer"
import { submitPatchOrder } from "./module/patchOrder/reducer"

const rootReducer = combineReducers({
  submitCustomForm: submitCustomForm,
  postCustomForm: postCustomForm,
  getQuestionnaire: getQuestionnaire,
  submitPatientForm: submitPatientForm,
  getPatients: getPatients,
  submitPatchOrder: submitPatchOrder,
  submitQuestionnaireForm: submitQuestionnaireForm,
});

export default rootReducer;
