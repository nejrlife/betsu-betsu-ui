import { put, call } from "redux-saga/effects";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_PENDING,
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE
} from "./constants";
import { handleLogin as handleLoginApi } from "./api/handleLogIn";

export function* watchLogIn(action) {
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: LOG_IN_PENDING,
  });
  try {
    const response = yield call(handleLoginApi, action?.payload);
    if (!response || !response.success) {
      yield put({
        type: LOG_IN_FAILURE,
        payload: {
          logInError: 'Sorry unable to connect to system!'
        }
      });
    } else {
      if (response.isUserAuthenticated === true) {
        yield put({
          type: LOG_IN_SUCCESS,
          payload: {
            isUserAuthenticated: response.isUserAuthenticated,
            memberId: response.memberId,
            userToken: response.token
          }
        });
      } else {
        yield put({
          type: LOG_IN_FAILURE,
          payload: {
            // logInError: response.message
            logInError: 'Invalid User Credentials!'
          }
        });
      }
    }
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      payload: {
        logInError: 'Sorry unable to connect to system!'
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}