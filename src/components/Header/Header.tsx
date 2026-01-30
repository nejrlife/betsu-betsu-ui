import "./Header.less";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedClearDetails } from "../../actions/auth";
import { retrieveUserDetailsClearDetails } from "../../actions/retrieveUserDetails";

const Header = (props: any) => {
  const navigate = useNavigate();

  const handleLogout = (event: any) => {
    event.preventDefault();
    props.isAuthClearDetails();
    props.retrieveUserDetailsClear();
    sessionStorage.removeItem('userToken');
    navigate('/login');
  }
  return (
    <div className='headerFlex red-box'>
      <p className='js_framework'>React JS</p>
      <p className='heading'>betsu-betsu</p>
      <div className='logoutFlex'>
        {props.isUserAuthenticated && (
          <Tooltip title="Logout" arrow>
            <IconButton
              className="logoutButton"
              onClick={handleLogout}
              aria-label="Logout"
              size="small"
            >
              <LogoutIcon className="logoutIcon" />
            </IconButton>
          </Tooltip>
        )}
      </div>  
    </div>
  )
}
const mapStateToProps = (state:any) => ({
  isUserAuthenticated: state.authenticateUser.isUserAuthenticated
});
const mapDispatchToProps  = (dispatch:any) => ({
  isAuthClearDetails: () => dispatch(isAuthenticatedClearDetails()),
  retrieveUserDetailsClear: () => dispatch(retrieveUserDetailsClearDetails())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
