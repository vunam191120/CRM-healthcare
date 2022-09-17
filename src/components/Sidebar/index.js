import React from 'react';
import { ImExit } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';

import healthCareLogo from './../../assets/img/healthCareLogo.png';
import { SidebarData } from './sidebarData';
import SubMenu from '../SubMenu';

const Sidebar = () => {
  // const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
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
