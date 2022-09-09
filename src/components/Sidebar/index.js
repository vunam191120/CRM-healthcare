import React from 'react';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';

import healthCareLogo from './../../assets/img/healthCareLogo.png';
import { SidebarData } from './sidebarData';
import SubMenu from '../SubMenu';
import { authenticationService } from '../../services/authentication.service';

const Sidebar = () => {
  // const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    authenticationService.logout();
  };

  // const handleToggleSidebar = () => {
  //   setSidebar(!sidebar);
  // };

  return (
    <div className="sidebar-container">
      <Link to="/" className="sidebar-logo">
        <img src={healthCareLogo} alt="HealthCare Logo" />
        <h4>
          Health<span>care</span>
        </h4>
      </Link>
      <ul className="sidebar-content">
        {SidebarData.map((item, index) => (
          <SubMenu item={item} key={index} />
        ))}
      </ul>
      <ImExit onClick={handleLogout} className="logout-btn" />
    </div>
  );
};

export default Sidebar;
