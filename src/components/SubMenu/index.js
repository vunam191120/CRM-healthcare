import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubMenu({ item }) {
  const [subnav, setSubnav] = useState(false);

  const handleToggleSubnav = () => setSubnav(!subnav);

  return (
    <li className="sidebar-item">
      <Link
        className="sidebar-link"
        to={item.path}
        onClick={item.subNav && handleToggleSubnav}
      >
        <span className="sidebar-icon">{item.icon}</span>
        <span>{item.title}</span>
        <span className="sidebar-subnav__btn">
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </span>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => (
          <Link className="sidebar-subnav" to={item.path} key={index}>
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
    </li>
  );
}
