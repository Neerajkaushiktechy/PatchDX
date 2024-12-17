
import axios from 'axios';
import Patch from '../constants/Patch';
import { API_END_POINT } from '../../Constants'

const getIndividualAllergen = (data) => {
    return axios
        .get(`${API_END_POINT}${Patch.SEARCH_INDIVIDUAL_ALLERGEN}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const getGroupAllergen = (data) => {
    return axios
        .get(`${API_END_POINT}${Patch.SEARCH_GROUP_ALLERGEN}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const submitPatchOrder = (data) => {
    return axios
        .post(`${API_END_POINT}${Patch.SUBMIT_PATCH_ORDER}`, data)
        .then(res => res)
        .catch(err => err);
}

const fetchPatchOrders = (data) => {
    return axios
        .get(`${API_END_POINT}${Patch.FETCH_PATCH_ORDER}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const fetchVendorOrderTests = (data) => {
    return axios
        .get(`${API_END_POINT}${Patch.FETCH_VENDOR_ORDER}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const submitVendorOrderSummary = (data) => {
    return axios
        .post(`${API_END_POINT}${Patch.SUBMIT_VENDOR_ORDER}`, data)
        .then(res => res)
        .catch(err => err);
}

const fetchPatchTestResults = (data) => {
    return axios
        .get(`${API_END_POINT}${Patch.FETCH_PATCH_TEST}`, { params: { data } })
        .then(res => res)
        .catch(err => err);
}

const fetchReactedAllergens = () => {
    return axios
        .get(`${API_END_POINT}${Patch.FETCH_REACTED_ALLERGENS}`)
        .then(res => res)
        .catch(err => err);
}

export {
    getIndividualAllergen,
    getGroupAllergen,
    submitPatchOrder,
    fetchPatchOrders,
    fetchVendorOrderTests,
    submitVendorOrderSummary,
    fetchPatchTestResults,
    fetchReactedAllergens,
}