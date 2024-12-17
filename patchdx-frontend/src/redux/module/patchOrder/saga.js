import { call, put, takeLatest } from "redux-saga/effects";
import {
    submitPatchOrderFailure,
    submitPatchOrderSuccess,
} from './action';
import {
    submitPatchOrder,
} from "../../../service/patch/patch";
import {
    SUBMIT_PATCH_ORDER_REQUEST,
} from "./actionType";

export function* submitPatchOrderWatcher() {
    yield takeLatest(SUBMIT_PATCH_ORDER_REQUEST, submitPatchOrderSaga);
}

function* submitPatchOrderSaga(action) {
    try {
        const res = yield call(submitPatchOrder,action.payload);
        yield put(
            submitPatchOrderSuccess(res)
        );
    } catch (e) {
        yield put(
            submitPatchOrderFailure(e)
        );
    }
}