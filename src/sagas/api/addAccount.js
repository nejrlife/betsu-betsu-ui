import axios from "axios";
import { call, delay } from "redux-saga/effects";
import { useSagaUtilsSingleton } from "../../common/utils/sagaUtilsSingleton";
const sagaUtils = useSagaUtilsSingleton();
const MOCK_TIME_BOUND_MIN = 500;
const MOCK_TIME_BOUND_MAX = 2000;

export function* addAccount(payload) {
  const { accountName, createdAt } = payload;
  const { VITE_MOCK_API, VITE_SERVICE_HOST } = import.meta.env;
  let response;
  // if (VITE_MOCK_API === 'true') {
  //   const rand = sagaUtils.getRandom(MOCK_TIME_BOUND_MIN, MOCK_TIME_BOUND_MAX);
  //   yield delay(rand);
  //   response = retrieveUserDetailsMockResp;
  // } else {
  const responseData = yield call(
    axios.post,
    `${VITE_SERVICE_HOST}/accounts/create`,
    {
      accountName,
      createdAt
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
  response = responseData.data;
  return response;
}