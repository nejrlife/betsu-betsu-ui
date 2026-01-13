import { SET_EXPANDED_ACCOUNT_ID } from '../sagas/constants';

export function setExpandedAccount(acctId: string) {
  return {
    type: SET_EXPANDED_ACCOUNT_ID,
    acctId
  };
}