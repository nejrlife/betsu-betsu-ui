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

// const initExpandedAcctDetailsState : ExpandedAccountDetails = {
  // name: '',
  // createdAt: '',
  // isAccountOpen: false,
  // isAccountPriority: false,
  // expenseDetails: null,
  // paymentDetails: null
// };

const INITIAL_STATE : AppDetails = {
  progressSpinnerShow: false,
  authenticateUser: { ...initAuthenticateUserDetailsState },
  userAccounts: {
    accounts: null,
    retrieveAccountsError: '',
    retrieveAccountsPending: false,
    addAccountStatus: '',
    addAccountPending: false
  },
  currentOpenedAccount: {
    expandedAcctId: '',
    expandedAcctError: '',
    expandedAcctPending: false,
    expandedAcctDetails: {},
    addExpenseItemPending: false,
    addExpenseItemStatus: '',
    makePaymentItemPending: false,
    makePaymentItemStatus: ''
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
    case actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS_SUCCESS: {
      const acctId = action.payload.expandedAcctDetails._id;
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctId: acctId,
          expandedAcctError: '',
          expandedAcctPending: false,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
            [acctId]: { ...action.payload.expandedAcctDetails }
          }
        }
      };
    }
    case actions.RETRIEVE_EXPANDED_ACCOUNT_DETAILS_FAILURE:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctId: action.payload.accountId,
          expandedAcctError: action.payload.errMessage,
          expandedAcctPending: false,
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
    case actions.ADD_EXPENSE_ITEM_SUCCESS: {
      const addExpenseCurrentAcctId = state.currentOpenedAccount.expandedAcctId;
      const addExpenseCurrentAcct = state.currentOpenedAccount.expandedAcctDetails[addExpenseCurrentAcctId];
      if (!addExpenseCurrentAcctId || !addExpenseCurrentAcct)
        return state;
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
            [addExpenseCurrentAcctId] : {
              ...addExpenseCurrentAcct,
              expenseDetails: [
                ...(addExpenseCurrentAcct.expenseDetails ?? []),
                action.payload.newExpenseItem
              ]
            }
          },
          addExpenseItemPending: false,
          addExpenseItemStatus: 'success'
        }
      };
    }
    case actions.ADD_EXPENSE_ITEM_FAILURE:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
          },
          addExpenseItemPending: false,
          addExpenseItemStatus: 'failure'
        }
      };
    case actions.ADD_EXPENSE_ITEM_PENDING:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
          },
          addExpenseItemPending: true,
          addExpenseItemStatus: ''
        }
      };
    case actions.MAKE_PAYMENT_ITEM_SUCCESS: {
      const currentAcctId = state.currentOpenedAccount.expandedAcctId;
      const currentAcct =
        state.currentOpenedAccount.expandedAcctDetails[currentAcctId];

      if (!currentAcctId || !currentAcct) return state;

      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
            [currentAcctId]: {
              ...currentAcct,
              paymentDetails: [
                ...(currentAcct.paymentDetails ?? []),
                action.payload.newPaymentItem,
              ],
            },
          },
          makePaymentItemPending: false,
          makePaymentItemStatus: "success",
        },
      };
    }
    case actions.MAKE_PAYMENT_ITEM_FAILURE:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
          },
          makePaymentItemPending: false,
          makePaymentItemStatus: 'failure'
        }
      };
    case actions.MAKE_PAYMENT_ITEM_PENDING:
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctDetails: {
            ...state.currentOpenedAccount.expandedAcctDetails,
          },
          makePaymentItemPending: true,
          makePaymentItemStatus: ''
        }
      };
    case actions.ADD_ACCOUNT_SUCCESS: {
      const newAcc = action.payload.newAccount;
      console.log("New Acc");
      console.log(newAcc);
      return {
        ...state,
        userAccounts: {
          ...state.userAccounts,
          accounts: [
            ...(state.userAccounts.accounts ?? []),
            action.payload.newAccount,
          ],
          addAccountStatus: 'success',
          addAccountPending: false
        }
      };
    }
    case actions.ADD_ACCOUNT_FAILURE:
      return {
        ...state,
        userAccounts: {
          ...state.userAccounts,
          addAccountStatus: 'error',
          addAccountPending: false
        }
      };
    case actions.ADD_ACCOUNT_PENDING:
      return {
        ...state,
        userAccounts: {
          ...state.userAccounts,
          addAccountStatus: '',
          addAccountPending: true
        }
      };
    case actions.SET_EXPANDED_ACCOUNT_ID: {
      console.log("Set expanded acct");
      console.log(action);
      return {
        ...state,
        currentOpenedAccount: {
          ...state.currentOpenedAccount,
          expandedAcctId: action.acctId
        }
      };
    }
    default:
      return state;
  }
}