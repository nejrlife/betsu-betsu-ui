import { put, call } from "redux-saga/effects";
import {
  PROGRESS_SPINNER_SHOW,
  PROGRESS_SPINNER_HIDE,
  ADD_EXPENSE_ITEM_FAILURE,
  ADD_EXPENSE_ITEM_SUCCESS,
  ADD_EXPENSE_ITEM_PENDING
} from "./constants";
import { addExpenseItem as addExpenseItemApi } from "./api/addExpenseItem";

export function* watchAddExpenseItem(action) {
  yield put({
    type: PROGRESS_SPINNER_SHOW
  });
  yield put({
    type: ADD_EXPENSE_ITEM_PENDING
  });
  try {
    const response = yield call(addExpenseItemApi, action?.payload);
    if (!response) {
      yield put({
        type: ADD_EXPENSE_ITEM_FAILURE,
        payload: {
          addExpenseItemError: response.message,
        },
      });
    } else {
      if (response?.status === "success") {
        yield put({
          type: ADD_EXPENSE_ITEM_SUCCESS,
          payload: {
            newExpenseItem: { ...response.newExpenseItem }
          },
        });
      } else {
        yield put({
          type: ADD_EXPENSE_ITEM_FAILURE,
          payload: {
            addExpenseItemError: response.message,
          },
        });
      }
    }
  } catch(err) {
    yield put({
      type: ADD_EXPENSE_ITEM_FAILURE,
      payload: {
        addExpenseItemError: err.message
      }
    });
  } finally {
    yield put({
      type: PROGRESS_SPINNER_HIDE
    });
  }
}