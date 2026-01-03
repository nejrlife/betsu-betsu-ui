export interface AppDetails {
  progressSpinnerShow: boolean,
  authenticateUser: AuthenticateUserDetails,
  membersDetails: MembersDetails,
  userAccounts: UserAccounts,
  currentOpenedAccount: CurrentOpenedAccount
}

export interface AuthenticateUserDetails {
  userToken: string,
  memberId: string,
  isUserAuthenticated: boolean,
  logInError: string,
  logInPending: boolean,
  isAuthenticatedError: string,
  isAuthenticatedPending: boolean
}

export interface MembersDetails {
  membersPool: Member[] | null,
  retrieveMembersDetailsError: string,
  retrieveMembersDetailsPending: boolean
}

export interface Member {
  id: string;
  name: string;
}

export interface UserAccounts {
  accounts: Account[] | null,
  retrieveAccountsError: string,
  retrieveAccountsPending: boolean
}

export interface CurrentOpenedAccount {
  accountId: string,
  expandAcctsError: string,
  expandAcctsPending: boolean,
  expandedAcctDetails: ExpandedAccountDetails;
}

export interface  Account {
  name: string;
  contributingMemberIds: string[];
}

export interface ExpandedAccountDetails {
  expenses: Expense[] | null;
  payments: Payment[] | null;
}

export interface Expense {
  name: string;
  date: string;
  expenseItems: ExpenseItem[];
  remarks: string;
}

export interface ExpenseItem {
  cashOutByMemberId: string;
  forMemberId: string;
  amount: string;
  remarks: string;
}

export interface Payment {
  amount: string;
  paidByMemberId: string;
  paidToMemberId: string;
  date: string;
  remarks: string;
}