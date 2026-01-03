import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Authenticating from "../../pages/Authenticating/Authenticating";
import Preloading from "../../pages/Preloading/Preloading";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IS_AUTHENTICATED, RETRIEVE_MEMBERS } from "../../sagas/constants";

const ProtectedDashboard = (props: any) => {
  const [isAuth, setAuth] = useState(false);
  const [isPreloadingFinished, setPreloadingFinished] = useState(false);
  const [isAuthPending, setAuthPending] = useState(false);

  const {
    dispatch  
  } = props;
  
  useEffect(() => {
    setAuth(props.isUserAuthenticated);
    const token = sessionStorage.getItem('userToken');
    if (props.isUserAuthenticated === false && token && token?.length > 0) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: {
          userToken: token
        }
      });
    }
  }, [props.isUserAuthenticated])

  useEffect(() => {
    if (props.isUserAuthenticated === true) {
      if (props.membersPool === null) {
        dispatch({
          type: RETRIEVE_MEMBERS,
          payload: {}
        });
      } else if (props.membersPool?.length > 0 && !isPreloadingFinished) {
        setPreloadingFinished(true);
      }
    }
  }, [props.isUserAuthenticated, props.membersPool])

  useEffect(() => {
    setAuthPending(props.isAuthenticatedPending);
  }, [props.isAuthenticatedPending]);

  return (
    isAuthPending ?
      <Authenticating /> : (
        !isPreloadingFinished ?
          <Preloading /> : (
            isAuth ?
              <DashboardLayout /> :
              <ErrorPage
                error='Your user session expired.'/>
          )
      )
  );
}
const mapStateToProps = (state:any) => ({
  isUserAuthenticated: state.authenticateUser.isUserAuthenticated,
  isAuthenticatedPending: state.authenticateUser.isAuthenticatedPending,
  isAuthenticatedError: state.authenticateUser.isAuthenticatedError,
  membersPool: state.membersDetails.membersPool,
});
export default connect(mapStateToProps, null)(ProtectedDashboard);