import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  MAKE_PAYMENT_ITEM_FAILURE,
  MAKE_PAYMENT_ITEM_SUCCESS,
  MAKE_PAYMENT_ITEM_PENDING
} from "./constants";
import { makePaymentItem as makePaymentItemApi } from "./api/makePaymentItem";

export function* watchMakePaymentItem(action) {
  console.log("received");
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: MAKE_PAYMENT_ITEM_PENDING
  });
  try {
    const response = yield call(makePaymentItemApi, action?.payload);
    if (!response) {
      yield put({
        type: MAKE_PAYMENT_ITEM_FAILURE,
        payload: {
          makePaymentItemError: response.message,
        },
      });
    } else {
      if (response?.status === "success") {
        yield put({
          type: MAKE_PAYMENT_ITEM_SUCCESS,
          payload: {
            newPaymentItem: { ...response.savedPayment }
          },
        });
      } else {
        yield put({
          type: MAKE_PAYMENT_ITEM_FAILURE,
          payload: {
            makePaymentItemError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: MAKE_PAYMENT_ITEM_FAILURE,
      payload: {
        makePaymentItemError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}