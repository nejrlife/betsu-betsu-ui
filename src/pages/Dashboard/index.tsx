import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Dashboard.less";
import idPic from "../../assets/img/placeholder-id.jpg";
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

  const [userName, setUserName] = useState<string>('');
  const location = useLocation();
  const [userLastLogin, setUserLastLogin] = useState<string>('');

  
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

  useEffect(() => {
    setUserName("Fenn Tonn");
    setUserLastLogin("02/14/2025");
  }, []);
  
  return (
    <>
      <div className='grey-box dashboardContainer'>
        {location.pathname === '/home/dashboard' &&
          <>
          <WelcomeBanner
            idPic={idPic}
            userName={userName}
            userLastLogin={userLastLogin}
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
});

export default connect(mapStateToProps, null)(Dashboard);