import "./ErrorPage.less";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ErrorPage = (props: any) => {
  const navigate = useNavigate();
  const handleLogin = (event: any) => {
    event.preventDefault();
    navigate('/login');
  }
  return (
    <div className='errorPageLayoutWidth'>
      <Header />
      <div className='grey-box errorPageContainer'>
        <h2 className='errorPageHeader'>
          {props.error ? props.error : 'An error occured.'}
        </h2>
        <a href="#" onClick={handleLogin}>Return to Login</a>
      </div>
    </div>
  )
}

export default ErrorPage;