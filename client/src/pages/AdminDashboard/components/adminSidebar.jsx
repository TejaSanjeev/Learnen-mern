import { faHammer , faCompass  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  ReportImg from '../assets/dashboard icon.png'
import DashboardImg from '../assets/Dashboard.png'
import UsersNavIcon from '../assets/Client Management.png'
import '../styles/adminSidebar.css'
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AdminSidebar(props) {

  const [activePage, setActivePage] = useState("Dashboard")

    const handleMenuItemClick = (item) => {
        props.onMenuItemClick(item);
        setActivePage(item);
    }
  return (
    <div className="admin-sidebar-wrapper">
      <div className="admin-sidebar-header">
        <FontAwesomeIcon style={{color:'#222831'}} icon={faHammer} className="admin-sidebar-fontawesome-icon" />
        <h2 style={{color:'#222831'}} > Admin </h2>
      </div>
      <div className="admin-general-section">
        <h2  className="admin-general-section-name-h2">General</h2>
        <div className="admin-general-section-list">
          <div className="admin-general-child" onClick={() => handleMenuItemClick('Dashboard')} id={activePage === 'Dashboard' ? 'active' : ''}>
            <div className="admin-general-child-logo-wrapper">
                <img src={DashboardImg} alt="dashboard-icon"/>
            </div>
            <p className="admin-general-section-name">Dashboard</p>
          </div>
          <div className="admin-general-child" onClick={() => handleMenuItemClick('Reports')} id={activePage === 'Reports' ? 'active' : ''}>
            <div className="admin-general-child-logo-wrapper">
                <img src={ReportImg} alt="report-icon"/>
            </div>
            <p className="admin-general-section-name">Reports</p>
          </div>
          <div className="admin-general-child" onClick={() => handleMenuItemClick('Course Nav')} >
            <FontAwesomeIcon style={{color:'#EEEEEE'}} icon={faCompass} className="admin-sidebar-fontawesome-icon"/>
            <p  className="admin-general-section-name" id={activePage === 'Course Nav' ? 'active' : ''}>Course Nav</p>
          </div>
          <div className="admin-general-child" onClick={() => handleMenuItemClick('Users')} id={activePage === 'Users' ? 'active' : ''}>
            <div className="admin-general-child-logo-wrapper">
                <img src={UsersNavIcon} alt="users-nav-icon"/>
            </div>
            <p className="admin-general-section-name">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
