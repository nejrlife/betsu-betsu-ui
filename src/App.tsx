import {
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import router from "./router";
import "./App.less";
import ProgressSpinner from "./components/ProgressSpinner/ProgressSpinner";

const App = (props:any) => {
  const [spinnerShow, setSpinnerShow] = useState(false);
  
  useEffect(() => {
    setSpinnerShow(props.progressSpinnerShow);
  },[props.progressSpinnerShow]);

  return (
    <div className="appContainer">
      {spinnerShow && <ProgressSpinner />}
      <RouterProvider router={router} />
    </div>
  )
}

const mapStateToProps = (state:any) => ({
  progressSpinnerShow: state.progressSpinnerShow
});

export default connect(mapStateToProps, null)(App);