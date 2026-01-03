import "./Header.less";
import { FiLogOut } from "react-icons/fi"
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
        {props.isUserAuthenticated && <FiLogOut
          onClick={handleLogout}
          color='#FFFFFF'
        />}  
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