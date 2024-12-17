import { all, fork } from "redux-saga/effects";
import {
  submitCustomFormWatcher,
  getQuestionnaireWatcher,
  submitPatientFormWatcher,
  getPatientWatcher,
  submitPatchOrderWatcher,
  submitQuestionnaireFormWatcher
} from './module'

export function* rootSaga() {
  yield all(
    [
      submitCustomFormWatcher(),
      getQuestionnaireWatcher(),
      submitPatientFormWatcher(),
      getPatientWatcher(),
      submitPatchOrderWatcher(),
      submitQuestionnaireFormWatcher(),
    ]
  );
}


