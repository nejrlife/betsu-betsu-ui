import { takeLeading } from "redux-saga/effects";
import * as actions from "./constants";
import { watchLogIn } from "./watchLogIn";
import { watchIsAuthenticated } from "./watchIsAuthenticated";
import { watchRetrieveAccountDetailsByMember } from "./watchRetrieveAccountDetailsByMember";
import { watchRetrieveMembersDetails } from "./watchRetrieveMembersDetails";

function* dataSaga() {
  yield takeLeading(actions.LOG_IN, watchLogIn);
  yield takeLeading (actions.IS_AUTHENTICATED, watchIsAuthenticated);
  yield takeLeading (actions.RETRIEVE_MEMBERS, watchRetrieveMembersDetails);
  yield takeLeading (actions.RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER, watchRetrieveAccountDetailsByMember);
}

export default dataSaga;