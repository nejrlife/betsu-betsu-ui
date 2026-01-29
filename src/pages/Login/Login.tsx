import Header from "../../components/Header/Header";
import "./Login.less";
import { connect } from "react-redux";
import { useEffect, useState } from "react"
import { IS_AUTHENTICATED, LOG_IN } from "../../sagas/constants";
import Button from "@mui/material/Button";
import {
  useNavigate
} from "react-router-dom";

const Login = (props: any) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [isUserIdValid, setUserIdValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    dispatch  
  } = props;

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage('');
    if (formData.userId?.length === 0 || formData.password?.length === 0) {
      setErrorMessage('Please enter login credentials to continue');
      return;
    }
    dispatch({
      type: LOG_IN,
      payload: {
        formData
      }
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    if (token && token?.length > 0) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: {
          userToken: token
        }
      });
    }
  }, [dispatch])

  useEffect(() => {
    if (props.isUserAuthenticated === true && props.userToken?.length > 0) {
      sessionStorage.setItem('userToken', props.userToken);
      navigate('/home/dashboard');
    }
  }, [props.isUserAuthenticated, props.userToken]);

  useEffect(() => {
    if (props?.loginError?.length > 0) {
      setErrorMessage(props.loginError);
    }
  }, [props.loginError]);

  useEffect(() => {
    const isUserValid = formData.userId?.length === 0 || formData.userId?.length >= 8 && formData.userId?.length <= 20;
    const isPwValid = formData.password?.length === 0 || formData.password?.length >= 8 && formData.password?.length <= 20;

    setUserIdValid(isUserValid);
    setPasswordValid(isPwValid);
  }, [formData.userId, formData.password]);

  return (
    <div className='loginLayoutWidth'>
      <Header />
      <div className='loginContainer'>
        { errorMessage &&
          <div className='errorMessage'>
            <p><b>Error: </b>{ errorMessage }</p>
          </div> }
        <form onSubmit={handleSubmit}>
          <div className='formContainer'>
            <div className='formFieldFlex'>
              <label><p>User ID</p></label>
              <input
                className="text-box"
                type="text"
                placeholder="Enter User ID"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
              />
            </div>
            <div className='validationFlex'>
              <div/>
              <span>{!isUserIdValid && <p>Please enter a valid username.</p>}</span>
            </div>
            <div className='formFieldFlex'>
              <label><p>Password</p></label>
              <input
                className="text-box"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='validationFlex'>
              <div/>
              <span>{!isPasswordValid && <p>Please enter a valid password.</p>}</span>
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
                "&:hover": {
                  backgroundColor: "var(--btn-primary-bg)",
                },
              }}
              // disabled={isButtonDisabled}
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
const mapStateToProps = (state:any) => ({
  isUserAuthenticated: state.authenticateUser.isUserAuthenticated,
  userToken: state.authenticateUser.userToken,
  loginError: state.authenticateUser.logInError,
});
export default connect(mapStateToProps, null)(Login);
