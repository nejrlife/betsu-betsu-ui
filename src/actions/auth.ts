import { IS_AUTHENTICATED_CLEARDETAILS } from '../sagas/constants';

export function isAuthenticatedClearDetails() {
  return {
    type: IS_AUTHENTICATED_CLEARDETAILS
  }
}