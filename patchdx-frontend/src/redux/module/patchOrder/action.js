import {
    SUBMIT_PATCH_ORDER_SUCCESS,
    SUBMIT_PATCH_ORDER_REQUEST,
    SUBMIT_PATCH_ORDER_FAILURE,

} from "./actionType";

export function submitPatchOrderRequest(order) {
    return {
        type: SUBMIT_PATCH_ORDER_REQUEST,
        payload: order,
    }
}

export function submitPatchOrderSuccess(order) {
    return {
        type: SUBMIT_PATCH_ORDER_SUCCESS,
        payload: order,
    }
}

export function submitPatchOrderFailure(order) {
    return {
        type: SUBMIT_PATCH_ORDER_FAILURE,
        payload: order,
    }
}
