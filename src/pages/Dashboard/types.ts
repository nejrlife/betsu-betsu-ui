export interface AccountDetail {
  _id: string;
  name: string;
  isAccountOpen: boolean;
  // isAccountPriority: boolean;
  createdAt: string;
  contributingMemberIds: string[]
}