import React from 'react';
import { ImExit } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';

import healthCareLogo from './../../assets/img/healthCareLogo.png';
import { SidebarData } from './sidebarData';
import SubMenu from '../SubMenu';
import Button from '../Button';

const Sidebar = ({ expanded, toggleExpanded }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className={`sidebar-container ${!expanded ? 'shrunk' : ''}`}>
      <Button className="expand-btn" onClick={toggleExpanded}>
        <BiChevronLeft className="expand-icon" />
      </Button>
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
