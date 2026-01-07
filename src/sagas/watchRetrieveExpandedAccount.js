import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE,
  RETRIEVE_EXPANDED_ACCOUNT_DETAILS_SUCCESS,
  RETRIEVE_EXPANDED_ACCOUNT_DETAILS_PENDING
} from "./constants";
import { getExpandedAccountDetails as getExpandedAccountDetailsApi } from "./api/getExpandedAccountDetails";

export function* watchRetrieveExpandedAccount(action) {
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS_PENDING
  });
  try {
    const response = yield call(getExpandedAccountDetailsApi, action?.payload);
    if (!response) {
      yield put({
        type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE,
        payload: {
          retrieveAccountDetailsError: response.message,
        },
      });
    } else {
      if (response?.success) {
        yield put({
          type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS_SUCCESS,
          payload: {
            expandedAcctDetails: { ...response.account }
          },
        });
      } else {
        yield put({
          type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE,
          payload: {
            retrieveAccountDetailsError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE,
      payload: {
        retrieveAccountDetailsError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}