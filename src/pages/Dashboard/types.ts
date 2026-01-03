export interface AccountDetail {
  _id: string;
  name: string;
  isAccountOpen: boolean;
  isAccountPriority: boolean;
  dateOpened: string;
  contributingMemberIds: string[]
}