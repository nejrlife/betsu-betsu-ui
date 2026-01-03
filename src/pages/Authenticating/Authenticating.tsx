import "./Authenticating.less";
import Header from "../../components/Header/Header";

const Authenticating = () => {
  return (
    <div className='authenticatingLayoutWidth'>
      <Header />
      <div className='grey-box authenticatingContainer'>
        <h2 className='authenticatingHeader'>
          Authenticating...
        </h2>
      </div>
    </div>
  )
}

export default Authenticating;