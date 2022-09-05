import React from 'react';
import healthCareLogo from './../../assets/img/healthCareLogo.png';
import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';

import { SidebarData } from './sidebarData';
import SubMenu from '../SubMenu';

export default function Sidebar() {
  // const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
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
