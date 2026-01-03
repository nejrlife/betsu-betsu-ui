import "./Preloading.less";
import Header from "../../components/Header/Header";

const Preloading = () => {
  return (
    <div className='preloadingLayoutWidth'>
      <Header />
      <div className='grey-box preloadingContainer'>
        <h2 className='preloadingHeader'>
        Initializing...
        </h2>
      </div>
    </div>
  )
}

export default Preloading;