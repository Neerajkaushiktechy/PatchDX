
import axios from 'axios';
import Patient from '../constants/Patient';
import { API_END_POINT } from '../../Constants'

const SubmitPatientForm = (data) => {
    return axios
        .post(`${API_END_POINT}${Patient.SUBMIT_PATIENT_FORM}`, data)
        .then(res => res)
        .catch(err => err);
}

const getPatients = (data) => {
    return axios
        .get(`${API_END_POINT}${Patient.GET_PATIENT}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const getPatientByName = (data) => {
    return axios
        .get(`${API_END_POINT}${Patient.SEARCH_PATIENT_BY_NAME}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const getUserAccountDetails = async () => {
    return axios
        .get(`${API_END_POINT}${Patient.GET_USER_ACCOUNT}`)
        .then((res) => res)
        .catch((err) => err);
};

const updateUserDetails = async (data) => {
    return axios
        .put(`${API_END_POINT}${Patient.UPDATE_USER_DETAILS}`, data)
        .then((res) => res)
        .catch((err) => err);
};

export {
    SubmitPatientForm,
    getPatients,
    getPatientByName,
    getUserAccountDetails,
    updateUserDetails,
}