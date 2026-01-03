import axios from "axios";
import { call, delay } from "redux-saga/effects";
import { useSagaUtilsSingleton } from "../../common/utils/sagaUtilsSingleton";
import isAuthenticatedMockResp from "../../assets/json/isAuthenticated.json";

const sagaUtils = useSagaUtilsSingleton();
const MOCK_TIME_BOUND_MIN = 500;
const MOCK_TIME_BOUND_MAX = 2000;

export function* getIsAuthenticated(payload) {
  const { userToken } = payload;
  const { VITE_MOCK_API, VITE_SERVICE_HOST } = import.meta.env;
  let response;
  if (VITE_MOCK_API === 'true') {
    const rand = sagaUtils.getRandom(MOCK_TIME_BOUND_MIN, MOCK_TIME_BOUND_MAX);
    yield delay(rand);
    response = isAuthenticatedMockResp;
  } else {
    console.log(`Calling: ${VITE_SERVICE_HOST}/loginUsers/isAuthenticated`);
    const responseData = yield call(
      axios.get,
      `${VITE_SERVICE_HOST}/loginUsers/isAuthenticated`,
      {
        headers: {
          'Authorization': userToken
        },
      }
    );
    response = responseData.data;
  }
  return response;
}