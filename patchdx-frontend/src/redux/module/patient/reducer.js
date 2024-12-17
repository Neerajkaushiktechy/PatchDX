import {
    SUBMIT_PATIENT_FORM_FAILURE,
    SUBMIT_PATIENT_FORM_REQUEST,
    SUBMIT_PATIENT_FORM_SUCCESS,
    GET_PATIENT_FAILURE,
    GET_PATIENT_REQUEST,
    GET_PATIENT_SUCCESS,
} from "./actionType";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

export function submitPatientForm(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_PATIENT_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_PATIENT_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SUBMIT_PATIENT_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}

export function getPatients(state = initialState, action) {
    switch (action.type) {
        case GET_PATIENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PATIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                error: null,
            };
        case GET_PATIENT_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload.data,
            };
        default:
            return {
                ...state,
            };
    }
}