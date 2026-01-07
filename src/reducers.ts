import * as actions from "./sagas/constants";
import { AppDetails, AuthenticateUserDetails, MembersDetails, ExpandedAccountDetails } from "./types"

const initAuthenticateUserDetailsState : AuthenticateUserDetails = {
  userToken: '',
  memberId: '',
  isUserAuthenticated: false,
  logInError: '',
  logInPending: false,
  isAuthenticatedError: '',
  isAuthenticatedPending: false
};

const initRetrieveMembersDetailsState : MembersDetails = {
  membersPool: null,
  retrieveMembersDetailsError: '',
  retrieveMembersDetailsPending: false
};

const initExpandedAcctDetailsState : ExpandedAccountDetails = {
  name: '',
  dateOpened: '',
  isAccountOpen: false,
  isAccountPriority: false,
  expenseDetails: null,
  paymentDetails: null,
  addExpenseItemPending: false,
  addExpenseItemStatus: ''
};

const INITIAL_STATE : AppDetails = {
  progressSpinnerShow: false,
  authenticateUser: { ...initAuthenticateUserDetailsState },
  userAccounts: {
    accounts: null,
    retrieveAccountsError: '',
    retrieveAccountsPending: false,
  },
  currentOpenedAccount: {
    expandedAcctId: '',
    expandedAcctError: '',
    expandedAcctPending: false,
    expandedAcctDetails: { ...initExpandedAcctDetailsState },
  },
  membersDetails: { ...initRetrieveMembersDetailsState },
}

export default function appReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        authenticateUser: {
          userToken: action.payload.userToken,
          isUserAuthenticated: action.payload.isUserAuthenticated,
          memberId: action.payload.memberId,
          logInError: '',
          logInPending: false
        }
      };
    case actions.LOG_IN_FAILURE:
      return {
        ...state,
        authenticateUser: {
          userToken: '',
          isUserAuthenticated: false,
          memberId: '',
          logInError: action.payload.logInError,
          logInPending: false
        }
      };
    case actions.LOG_IN_PENDING:
      return {
        ...state,
        authenticateUser: {
          ...state.authenticateUser,
          logInError: '',
          logInPending: true
        }
      };
    case actions.RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_SUCCESS:
      return {
        ...state,
        userAccounts: {
          accounts: [ ...action.payload.accounts ],
          retrieveAccountsError: '',
          retrieveAccountsPending: false
        }
      };
    case actions.RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_FAILURE:
      return {
        ...state,
        userAccounts: {
          accounts: null,
          retrieveAccountsError: action.payload.retrieveAccountDetailsError,
          retrieveAccountsPending: false
        }
      };
    case actions.RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER_PENDING:
      return {
        ...state,
        userAccounts: {
          ...state.userAccounts,
          retrieveAccountsPending: true
        }
      };
    case actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        currentOpenedAccount: {
          expandedAcctId: action.payload.expandedAcctDetails._id,
          expandedAcctError: '',
          expandedAcctPending: false,
          expandedAcctDetails: { ...action.payload.expandedAcctDetails },
        }
      };
    case actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE:
      return {
        ...state,
        currentOpenedAccount: {
          expandedAcctId: action.payload.accountId,
          expandedAcctError: action.payload.errMessage,
          expandedAcctPending: false,
          expandedAcctDetails: { ...initExpandedAcctDetailsState },
        }
      };
    case actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS_PENDING:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctPending: true,
        }
      };
    case actions.PROGRESS_SPINNER_SHOW:
      return {
        ...state,
        progressSpinnerShow: true
      };
    case actions.PROGRESS_SPINNER_HIDE:
      return {
        ...state,
        progressSpinnerShow: false
      };
    case actions.IS_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticateUser: {
          memberId: action.payload.memberId,
          userToken: action.payload.userToken,
          isUserAuthenticated: true,
          isAuthenticatedError: '',
          isAuthenticatedPending: false
        }
      };
    case actions.IS_AUTHENTICATED_FAILURE:
      return {
        ...state,
        authenticateUser: {
          isUserAuthenticated: false,
          userToken: '',
          isAuthenticatedError: action.payload.isAuthenticatedError,
          isAuthenticatedPending: false
        }
      };
    case actions.IS_AUTHENTICATED_PENDING:
      return {
        ...state,
        authenticateUser: {
          ...state.authenticateUser,
          isAuthenticatedPending: true
        }
      };
    case actions.IS_AUTHENTICATED_CLEARDETAILS:
      return {
        ...state,
        authenticateUser: { ...initAuthenticateUserDetailsState }
      };
    case actions.RETRIEVE_MEMBERS_SUCCESS:
      return {
        ...state,
        membersDetails: {
          membersPool: [ ...action.payload.retrieveMembersDetails ],
          retrieveMembersDetailsError: '',
          retrieveMembersDetailsPending: false
        }
      };
    case actions.RETRIEVE_MEMBERS_FAILURE:
      return {
        ...state,
        membersDetails: { ...initRetrieveMembersDetailsState }
      };
    case actions.RETRIEVE_MEMBERS_PENDING:
      return {
        ...state,
        membersDetails: {
          ...state.membersDetails,
          retrieveMembersDetailsPending: true
        }
      };
      case actions.ADD_EXPENSE_ITEM_SUCCESS:
        return {
          ...state,
          currentOpenedAccount: {
            ...state.currentOpenedAccount,
            expandedAcctDetails: {
              ...state.currentOpenedAccount.expandedAcctDetails,
              expenseDetails: [
                ...(state.currentOpenedAccount.expandedAcctDetails.expenseDetails ?? []),
                action.payload.newExpenseItem,
              ],
              addExpenseItemPending: false,
              addExpenseItemStatus: 'success'
            },
          }
        };
        case actions.ADD_EXPENSE_ITEM_FAILURE:
          return {
            ...state,
            currentOpenedAccount: {
              ...state.currentOpenedAccount,
              expandedAcctDetails: {
                ...state.currentOpenedAccount.expandedAcctDetails,
                addExpenseItemPending: false,
                addExpenseItemStatus: 'failure'
              },
            }
          };
      case actions.ADD_EXPENSE_ITEM_PENDING:
        return {
          ...state,
          currentOpenedAccount: {
            ...state.currentOpenedAccount,
            expandedAcctDetails: {
              ...state.currentOpenedAccount.expandedAcctDetails,
              addExpenseItemPending: true,
              addExpenseItemStatus: ''
            },
          }
        };
    default:
      return state;
  }
}