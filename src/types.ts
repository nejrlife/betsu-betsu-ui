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
  avatarKey: string;
}

export interface UserAccounts {
  accounts: Account[] | null,
  retrieveAccountsError: string,
  retrieveAccountsPending: boolean,
  addAccountStatus: string,
  addAccountPending: boolean
}

export interface CurrentOpenedAccount {
  expandedAcctId: string,
  expandedAcctError: string,
  expandedAcctPending: boolean,
  expandedAcctDetails:  Record<string, ExpandedAccountDetails>;
  addExpenseItemPending: boolean;
  addExpenseItemStatus: string;
  makePaymentItemPending: boolean;
  makePaymentItemStatus: string;
}

export interface  Account {
  name: string;
  contributingMemberIds: string[];
}

export interface ExpandedAccountDetails {
  name: string;
  createdAt: string;
  isAccountOpen: boolean;
  // isAccountPriority: boolean;
  expenseDetails: ExpenseItem[] | null;
  paymentDetails: Payment[] | null;
}

export interface ExpenseItem {
  _id: string
  cashOutByMemberId: string;
  forMemberId: string;
  amount: string;
  remarks: string;
  createdAt: string;
}

export interface Payment {
  amount: string;
  paidByMemberId: string;
  paidToMemberId: string;
  createdAt: string;
  remarks: string;
}