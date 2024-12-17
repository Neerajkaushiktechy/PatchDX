import {
    SUBMIT_CUSTOM_FORM_REQUEST,
    SUBMIT_CUSTOM_FORM_SUCCESS,
    SUBMIT_CUSTOM_FORM_FAILURE,
    CREATE_CUSTOM_FORM_REQUEST,
    CREATE_CUSTOM_FORM_SUCCESS,
    CREATE_CUSTOM_FORM_FAILURE,
    SHOW_FIRST_CUSTOM_FORM,
    GET_QUESTIONNAIRE_REQUEST,
    GET_QUESTIONNAIRE_SUCCESS,
    GET_QUESTIONNAIRE_FAILURE,
    SUBMIT_QUESTIONNAIRE_FORM_REQUEST,
    SUBMIT_QUESTIONNAIRE_FORM_SUCCESS,
    SUBMIT_QUESTIONNAIRE_FORM_FAILURE
} from "./actionType";

const initialState = {
    loading: false,
    data: [],
    error: null,
    showselectedFirst: false
};

const questionnaireInitialState = {
    loading: false,
    data: [],
    error: null,
}

export function postCustomForm(state = initialState, action) {
    switch (action.type) {
        case CREATE_CUSTOM_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CUSTOM_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
                showselectedFirst: true
            };
        case CREATE_CUSTOM_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            };
        case SHOW_FIRST_CUSTOM_FORM:
            return {
                ...state,
                loading: false,
                showselectedFirst: false
            };
        default:
            return {
                ...state,
            };
    }
}

export function submitCustomForm(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_CUSTOM_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_CUSTOM_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SUBMIT_CUSTOM_FORM_FAILURE:
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

export function getQuestionnaire(state = questionnaireInitialState, action) {
    switch (action.type) {
        case GET_QUESTIONNAIRE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_QUESTIONNAIRE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                error: null,
            };
        case GET_QUESTIONNAIRE_FAILURE:
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

export function submitQuestionnaireForm(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_QUESTIONNAIRE_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_QUESTIONNAIRE_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SUBMIT_QUESTIONNAIRE_FORM_FAILURE:
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