import {
    SUBMIT_PATCH_ORDER_FAILURE,
    SUBMIT_PATCH_ORDER_SUCCESS,
    SUBMIT_PATCH_ORDER_REQUEST,
} from "./actionType";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

export function submitPatchOrder(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_PATCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_PATCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case SUBMIT_PATCH_ORDER_FAILURE:
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