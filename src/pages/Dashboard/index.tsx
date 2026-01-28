import { useMemo, useEffect  } from "react";
import { connect } from "react-redux";
import "./Dashboard.less";
import { RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER } from "../../sagas/constants";
import WelcomeBanner from './WelcomeBanner';
import {
  Outlet
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Dashboard = (props: any) => {
  const {
    dispatch  
  } = props;

  const location = useLocation();

  
  useEffect(() => {
    if (props.memberId && (!props.retrieveAccountDetailsByMember || props.retrieveAccountDetailsByMember?.length === 0)) {
      dispatch({
        type: RETRIEVE_ACCOUNT_DETAILS_BY_MEMBER,
        payload: {
          memberId: props.memberId
        }
      });
    }
  },[props.memberId, props.retrieveAccountDetailsByMember]);

  const currentMember = useMemo(
    () => props.membersPool?.find((member: any) => member._id === props.memberId),
    [props.membersPool, props.memberId]
  );

  return (
    <>
      <div className='grey-box dashboardContainer'>
        {location.pathname === '/home/dashboard' &&
          <>
          <WelcomeBanner
            userName={currentMember?.name ?? ""}
            avatarKey={currentMember?.avatarKey ?? ""}
          />
          <hr />
          </>
        }
        <Outlet />
      </div>
    </>
  )
}

const mapStateToProps = (state:any) => ({
  userToken: state.authenticateUser.userToken,
  memberId: state.authenticateUser.memberId,
  retrieveAccountDetailsByMember: state.userAccounts.accounts,
  membersPool: state.membersDetails?.membersPool
});

export default connect(mapStateToProps, null)(Dashboard);
