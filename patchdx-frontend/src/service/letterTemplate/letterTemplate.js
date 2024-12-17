
import axios from 'axios';
import LetterTemplate from '../constants/LetterTemplate';
import { API_END_POINT } from '../../Constants'

const submitLetterTemplate = (data) => {
    return axios
        .post(`${API_END_POINT}${LetterTemplate.SUBMIT_LETTER_TEMPLATE}`, data)
        .then(res => res)
        .catch(err => err);
}

const fetchLetterTemplate = (data) => {
    return axios
        .get(`${API_END_POINT}${LetterTemplate.FETCH_LETTER_TEMPLATE}`, data)
        .then(res => res)
        .catch(err => err);
}

const getSingleLetterTemplate = (id) => {
    return axios
        .get(`${API_END_POINT}${LetterTemplate.SINGLE_LETTER_TEMPLATE}`, { params: { id } })
        .then(res => res)
        .catch(err => err);
}

const getSingleSummaryLetter = (id) => {
    return axios
        .get(`${API_END_POINT}${LetterTemplate.SINGLE_SUMMARY_LETTER}`, { params: { id } })
        .then(res => res)
        .catch(err => err);
}

const submitSummaryLetter = (data) => {
    return axios
        .post(`${API_END_POINT}${LetterTemplate.SUBMIT_SUMMARY_LETTER}`, data)
        .then(res => res)
        .catch(err => err);
}

export {
    submitLetterTemplate,
    fetchLetterTemplate,
    getSingleLetterTemplate,
    submitSummaryLetter,
    getSingleSummaryLetter,
}