import React from 'react';
import healthCareLogo from './../../assets/img/healthCareLogo.png';
import { ImExit } from 'react-icons/im';

import { SidebarData } from './sidebarData';
import SubMenu from '../SubMenu';
import { authenticationService } from '../../services/authentication.service';

export default function Sidebar() {
  // const [sidebar, setSidebar] = useState(false);

  const handleLogout = () => {
    authenticationService.logout();
  };

  // const handleToggleSidebar = () => {
  //   setSidebar(!sidebar);
  // };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src={healthCareLogo} alt="HealthCare Logo" />
        <h4>
          Health<span>care</span>
        </h4>
      </div>
      <ul className="sidebar-content">
        {SidebarData.map((item, index) => (
          <SubMenu item={item} key={index} />
        ))}
      </ul>
      <ImExit onClick={handleLogout} className="logout-btn" />
    </div>
  );
}
