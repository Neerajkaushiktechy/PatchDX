
import axios from 'axios';
import Questionnaire from '../constants/Questionnaire';
import { API_END_POINT } from '../../Constants'

const SubmitQuestionnaireForm = (data) => {
    return axios
        .post(`${API_END_POINT}${Questionnaire.SUBMIT_QUESTIONNAIRE_FORM}`, data)
        .then(res => res)
        .catch(err => err);
}

const checkQuestionnaireExist = (data) => {
    return axios
        .post(`${API_END_POINT}${Questionnaire.CHECK_QUESTIONNAIRE_EXIST}`, data)
        .then(res => res)
        .catch(err => err);
}

const getQuestionnaire = () => {
    return axios
        .get(`${API_END_POINT}${Questionnaire.GET_QUESTIONNAIRE}`)
        .then(res => res)
        .catch(err => err);
}

const getSingleQuestionnaire = (id) => {
    return axios
        .get(`${API_END_POINT}${Questionnaire.GET_SINGLE_QUESTIONNAIRE}`, { params: { id } })
        .then(res => res)
        .catch(err => err);
}

const sendQuestionnaireLink = (id) => {
    return axios
        .post(`${API_END_POINT}${Questionnaire.SEND_QUESTIONNAIRE_LINK}`, id)
        .then(res => res)
        .catch(err => err);
}

const copyQuestionnaireLink = (id) => {
    return axios
        .post(`${API_END_POINT}${Questionnaire.COPY_QUESTIONNAIRE_LINK}`, id)
        .then(res => res)
        .catch(err => err);
}

const getQuestionnaireForm = (id) => {
    return axios
        .get(`${API_END_POINT}${Questionnaire.GET_QUESTIONNAIRE_FORM}`, { params: { id } })
        .then(res => res)
        .catch(err => err);
}

const SubmitQuestionnaireFormResponse = (data) => {
    return axios
        .post(`${API_END_POINT}${Questionnaire.SUBMIT_QUESTIONNAIRE_FORM_RES}`, data)
        .then(res => res)
        .catch(err => err);
}

const getPatientQuestionnaires = (id) => {
    return axios
        .get(`${API_END_POINT}${Questionnaire.GET_PATIENT_QUESTIONNAIRE}`, { params: { id } })
        .then(res => res)
        .catch(err => err);
}

const checkResponseExist = (data) => {
    return axios
        .get(`${API_END_POINT}${Questionnaire.CHECK_RESPONSE_EXIST}`, { params: data })
        .then(res => res)
        .catch(err => err);
}

export {
    SubmitQuestionnaireForm,
    getQuestionnaire,
    getSingleQuestionnaire,
    checkQuestionnaireExist,
    sendQuestionnaireLink,
    copyQuestionnaireLink,
    getQuestionnaireForm,
    SubmitQuestionnaireFormResponse,
    getPatientQuestionnaires,
    checkResponseExist,
}