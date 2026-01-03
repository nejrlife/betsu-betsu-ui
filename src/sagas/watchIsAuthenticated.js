import { put, call } from "redux-saga/effects";
import {
  IS_AUTHENTICATED_SUCCESS,
  IS_AUTHENTICATED_FAILURE,
  IS_AUTHENTICATED_PENDING,
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE
} from "./constants";
import { getIsAuthenticated as getIsAuthenticatedApi } from "./api/getIsAuthenticated";

export function* watchIsAuthenticated(action) {
  const token = action?.payload?.userToken;
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: IS_AUTHENTICATED_PENDING,
  });
  try {
    const response = yield call(getIsAuthenticatedApi, action?.payload);

    if (!response || !response.success) {
      yield put({
        type: IS_AUTHENTICATED_FAILURE,
        payload: {
          isAuthenticatedError: response.message,
        }
      });
    } else {
      if (response.success === true) {
        yield put({
          type: IS_AUTHENTICATED_SUCCESS,
          payload: {
            memberId: response.memberId,
            userToken: token
          },
        });
      } else {
        yield put({
          type: IS_AUTHENTICATED_FAILURE,
          payload: {
            isAuthenticatedError: response.message,
          },
        });
      }
    }
  } catch (err) {
    yield put({
      type: IS_AUTHENTICATED_FAILURE,
      payload: {
        isAuthenticatedError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}