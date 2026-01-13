import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  ADD_ACCOUNT_FAILURE,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_PENDING
} from "./constants";
import { addAccount as addAccountApi } from "./api/addAccount.js";

export function* watchAddAccount(action) {
  console.log("received add");
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: ADD_ACCOUNT_PENDING
  });
  try {
    const response = yield call(addAccountApi, action?.payload);
    if (!response) {
      yield put({
        type: ADD_ACCOUNT_FAILURE,
        payload: {
          // addAccouintError: response.message,
        },
      });
    } else {
      if (response?.status === "success") {
        yield put({
          type: ADD_ACCOUNT_SUCCESS,
          payload: {
            newAccount: { ...response.newAccount }
          },
        });
      } else {
        yield put({
          type: ADD_ACCOUNT_FAILURE,
          payload: {
            // makePaymentItemError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: ADD_ACCOUNT_FAILURE,
      payload: {
        // makePaymentItemError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}