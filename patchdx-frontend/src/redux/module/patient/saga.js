import { call, put, takeLatest } from "redux-saga/effects";
import {
    submitPatientFormRequestSuccess,
    submitPatientFormRequestFaliure,
    getPatientFailure,
    getPatientSuccess,
} from './action';
import {
    SubmitPatientForm,
    getPatients,
} from "../../../service/patient/Patient";
import {
    SUBMIT_PATIENT_FORM_REQUEST,
    GET_PATIENT_REQUEST,
} from "./actionType";

export function* submitPatientFormWatcher() {
    yield takeLatest(SUBMIT_PATIENT_FORM_REQUEST, submitPatientFormSaga);
}

function* submitPatientFormSaga(action) {
    try {
        const res = yield call(SubmitPatientForm,action.payload);
        yield put(
            submitPatientFormRequestSuccess(res)
        );
    } catch (e) {
        yield put(
            submitPatientFormRequestFaliure(e)
        );
    }
}

export function* getPatientWatcher() {
    yield takeLatest(GET_PATIENT_REQUEST, getPatientSaga);
}

function* getPatientSaga(action) {
    try {
        const res = yield call(getPatients,action.payload);
        yield put(
            getPatientSuccess(res)
        );
    } catch (e) {
        yield put(
            getPatientFailure(e)
        );
    }
}