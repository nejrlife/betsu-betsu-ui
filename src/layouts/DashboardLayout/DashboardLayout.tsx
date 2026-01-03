import { useEffect } from "react";
import {
  Outlet, useNavigate, useLocation
} from "react-router-dom";
import Header from "../../components/Header/Header";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./DashboardLayout.less";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/home/dashboard');
    }
  },[])

  const layout = (
    <div className="layoutWidth">
      <Header />
      <div className='dashboardFlex'>
        <SideNavBar />
        <div className='outletClass'>
          <Outlet />
        </div>
      </div>
    </div>
  )

  return (
    <div className="layoutContainer">{ layout }</div>
  )
}

export default DashboardLayout;