import { call, put, takeLatest } from "redux-saga/effects";
import {
    submitCustomFormRequest,
    submitcustomFormRequestFaliure,
    submitcustomFormRequestSuccess,
    getQuestionnaireFailure,
    getQuestionnaireSuccess,
    getQuestionnaireRequest,
    submitQuestionnaireFormRequest,
    submitQuestionnaireFormRequestFaliure,
    submitQuestionnaireFormRequestSuccess
} from './action';
import {
    SubmitQuestionnaireForm,
    getQuestionnaire,
    SubmitQuestionnaireFormResponse
} from "../../../service/questionnaire/Questionnaire";
import {
    SUBMIT_CUSTOM_FORM_REQUEST,
    GET_QUESTIONNAIRE_REQUEST,
    SUBMIT_QUESTIONNAIRE_FORM_REQUEST
} from "./actionType";

export function* submitCustomFormWatcher() {
    yield takeLatest(SUBMIT_CUSTOM_FORM_REQUEST, submitCustomFormSaga);
}

function* submitCustomFormSaga(action) {
    try {
        const res = yield call(SubmitQuestionnaireForm(action.payload));
        yield put(
            submitcustomFormRequestSuccess(res)
        );
    } catch (e) {
        yield put(
            submitcustomFormRequestFaliure(e)
        );
    }
}

export function* getQuestionnaireWatcher() {
    yield takeLatest(GET_QUESTIONNAIRE_REQUEST, getQuestionnaireSaga);
}

function* getQuestionnaireSaga(action) {
    try {
        const res = yield call(getQuestionnaire);
        yield put(
            getQuestionnaireSuccess(res)
        );
    } catch (e) {
        yield put(
            getQuestionnaireFailure(e)
        );
    }
}

export function* submitQuestionnaireFormWatcher() {
    yield takeLatest(SUBMIT_QUESTIONNAIRE_FORM_REQUEST, submitQuestionnaireFormSaga);
}

function* submitQuestionnaireFormSaga(action) {
    try {
        const res = yield call(SubmitQuestionnaireFormResponse,action.payload);
        yield put(
            submitQuestionnaireFormRequestSuccess(res)
        );
    } catch (e) {
        yield put(
            submitQuestionnaireFormRequestFaliure(e)
        );
    }
}