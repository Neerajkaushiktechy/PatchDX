import {
    SUBMIT_CUSTOM_FORM_FAILURE,
    SUBMIT_CUSTOM_FORM_REQUEST,
    SUBMIT_CUSTOM_FORM_SUCCESS,
    CREATE_CUSTOM_FORM_REQUEST,
    CREATE_CUSTOM_FORM_SUCCESS,
    CREATE_CUSTOM_FORM_FAILURE,
    GET_QUESTIONNAIRE_REQUEST,
    GET_QUESTIONNAIRE_SUCCESS,
    GET_QUESTIONNAIRE_FAILURE,
    SUBMIT_QUESTIONNAIRE_FORM_FAILURE,
    SUBMIT_QUESTIONNAIRE_FORM_REQUEST,
    SUBMIT_QUESTIONNAIRE_FORM_SUCCESS,
} from "./actionType";

// POST custom form 
export function postcustomFormRequest(payload) {
    return {
        type: CREATE_CUSTOM_FORM_REQUEST,
        payload
    }
};

export function postcustomFormRequestSuccess(payload) {
    return {
        type: CREATE_CUSTOM_FORM_SUCCESS,
        payload
    }
};

export function postcustomFormRequestFaliure(payload) {
    return {
        type: CREATE_CUSTOM_FORM_FAILURE,
        payload
    }
};

export function submitCustomFormRequest(users) {
    return {
        type: SUBMIT_CUSTOM_FORM_REQUEST,
        payload: users,
    }
}

export function submitcustomFormRequestSuccess(users) {
    return {
        type: SUBMIT_CUSTOM_FORM_SUCCESS,
        payload: users,
    }
}

export function submitcustomFormRequestFaliure(users) {
    return {
        type: SUBMIT_CUSTOM_FORM_FAILURE,
        payload: users,
    }
}

export function getQuestionnaireRequest(users) {
    return {
        type: GET_QUESTIONNAIRE_REQUEST,
        payload: users,
    }
}

export function getQuestionnaireSuccess(users) {
    return {
        type: GET_QUESTIONNAIRE_SUCCESS,
        payload: users,
    }
}

export function getQuestionnaireFailure(users) {
    return {
        type: GET_QUESTIONNAIRE_FAILURE,
        payload: users,
    }
}

export function submitQuestionnaireFormRequest(users) {
    return {
        type: SUBMIT_QUESTIONNAIRE_FORM_REQUEST,
        payload: users,
    }
}

export function submitQuestionnaireFormRequestSuccess(users) {
    return {
        type: SUBMIT_QUESTIONNAIRE_FORM_SUCCESS,
        payload: users,
    }
}

export function submitQuestionnaireFormRequestFaliure(users) {
    return {
        type: SUBMIT_QUESTIONNAIRE_FORM_FAILURE,
        payload: users,
    }
}