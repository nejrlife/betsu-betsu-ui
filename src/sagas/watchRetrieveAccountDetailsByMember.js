import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_FAILURE,
  RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_SUCCESS,
  RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_PENDING
} from "./constants";
import { getAccountDetailsByMember as getAccountDetailsByMemberApi } from "./api/getAccountDetailsByMember";

export function* watchRetrieveAccountDetailsByMember(action) {
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_PENDING
  });
  try {
    const response = yield call(getAccountDetailsByMemberApi, action?.payload);
    if (!response) {
      yield put({
        type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_FAILURE,
        payload: {
          retrieveAccountDetailsError: response.message,
        },
      });
    } else {
      if (response?.length > 0) {
        yield put({
          type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_SUCCESS,
          payload: {
            accounts: response
          },
        });
      } else {
        yield put({
          type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_FAILURE,
          payload: {
            retrieveAccountDetailsError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_FAILURE,
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