import "./SideNavBar.less";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
  return (
    <>
      <div className='grey-box leftSider'>
        <ul>
          <nav id="sidebar">
            <li>
              <NavLink
                to="/home/dashboard"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }>DASHBOARD</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/home/about">ABOUT</NavLink>
            </li>
            <hr />
            <li>
              <NavLink to="/home/team">TEAM</NavLink>
            </li>
          </nav>
        </ul>
      </div>
    </>
  )
}
export default SideNavBar;