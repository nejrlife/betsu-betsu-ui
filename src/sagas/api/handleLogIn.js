import axios from "axios";
import { call, delay } from "redux-saga/effects";
import { useSagaUtilsSingleton } from "../../common/utils/sagaUtilsSingleton";
import logInMockResp from "../../assets/json/logIn.json";

const sagaUtils = useSagaUtilsSingleton();
const MOCK_TIME_BOUND_MIN = 500;
const MOCK_TIME_BOUND_MAX = 2000;

export function* handleLogin(payload) {
  const { VITE_MOCK_API, VITE_SERVICE_HOST } = import.meta.env;
  const formData = payload?.formData;
  let response;
  if (VITE_MOCK_API === 'true') {
    const rand = sagaUtils.getRandom(MOCK_TIME_BOUND_MIN, MOCK_TIME_BOUND_MAX);
    yield delay(rand);
    response = logInMockResp;
  } else {
    const responseData = yield call(
      axios.post,
      `${VITE_SERVICE_HOST}/loginUsers/login`,
      {
        clientId: "Betsu-Web",
        loginUser: {
          username: formData.userId,
          password: formData.password
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    response = responseData.data;
  }
  return response;
}