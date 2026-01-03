import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  RETRIEVE_MEMBERS,
  RETRIEVE_MEMBERS_SUCCESS,
  RETRIEVE_MEMBERS_FAILURE,
  RETRIEVE_MEMBERS_PENDING,
} from "./constants";
import { getRetrieveMembersDetails as getRetrieveMembersDetailsApi } from "./api/getRetrieveMembersDetails";

export function* watchRetrieveMembersDetails(action) {
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: RETRIEVE_MEMBERS_PENDING
  });
  try {
    const response = yield call(getRetrieveMembersDetailsApi);
    if (!response) {
      yield put({
        type: RETRIEVE_MEMBERS_FAILURE,
        payload: {
          retrieveMembersDetailsError: response.message,
        },
      });
    } else {
      if (response?.length > 0) {
        yield put({
          type: RETRIEVE_MEMBERS_SUCCESS,
          payload: {
            retrieveMembersDetails: response
          },
        });
      } else {
        yield put({
          type: RETRIEVE_MEMBERS_FAILURE,
          payload: {
            retrieveMembersDetailsError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: RETRIEVE_MEMBERS_FAILURE,
      payload: {
        retrieveMembersDetailsError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}