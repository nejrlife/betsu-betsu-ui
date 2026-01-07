import { takeLeading } from "redux-saga/effects";
import * as actions from "./constants";
import { watchLogIn } from "./watchLogIn";
import { watchIsAuthenticated } from "./watchIsAuthenticated";
import { watchRetrieveAccountDetailsByMember } from "./watchRetrieveAccountDetailsByMember";
import { watchRetrieveExpandedAccount } from "./watchRetrieveExpandedAccount";
import { watchRetrieveMembersDetails } from "./watchRetrieveMembersDetails";
import { watchAddExpenseItem } from "./watchAddExpenseItem";

function* dataSaga() {
  yield takeLeading(actions.LOG_IN, watchLogIn);
  yield takeLeading (actions.IS_AUTHENTICATED, watchIsAuthenticated);
  yield takeLeading (actions.RETRIEVE_MEMBERS, watchRetrieveMembersDetails);
  yield takeLeading (actions.RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER, watchRetrieveAccountDetailsByMember);
  yield takeLeading (actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS, watchRetrieveExpandedAccount);
  yield takeLeading (actions.ADD_EXPENSE_ITEM, watchAddExpenseItem);
}

export default dataSaga;