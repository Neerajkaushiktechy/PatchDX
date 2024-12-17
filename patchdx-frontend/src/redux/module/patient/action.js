import {
    SUBMIT_PATIENT_FORM_FAILURE,
    SUBMIT_PATIENT_FORM_REQUEST,
    SUBMIT_PATIENT_FORM_SUCCESS,
    GET_PATIENT_FAILURE,
    GET_PATIENT_SUCCESS,
    GET_PATIENT_REQUEST,
} from "./actionType";

export function submitPatientFormRequest(patient) {
    return {
        type: SUBMIT_PATIENT_FORM_REQUEST,
        payload: patient,
    }
}

export function submitPatientFormRequestSuccess(patient) {
    return {
        type: SUBMIT_PATIENT_FORM_SUCCESS,
        payload: patient,
    }
}

export function submitPatientFormRequestFaliure(patient) {
    return {
        type: SUBMIT_PATIENT_FORM_FAILURE,
        payload: patient,
    }
}

export function getPatientRequest(users) {
    return {
        type: GET_PATIENT_REQUEST,
        payload: users,
    }
}

export function getPatientSuccess(users) {
    return {
        type: GET_PATIENT_SUCCESS,
        payload: users,
    }
}

export function getPatientFailure(users) {
    return {
        type: GET_PATIENT_FAILURE,
        payload: users,
    }
}
