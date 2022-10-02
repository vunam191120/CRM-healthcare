import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Content from './Content';

export default function Layout() {
  const [expand, setExpand] = useState(true);

  return (
    <div className={`layout-container ${!expand ? 'shrunk' : ''}`}>
      <Sidebar toggleExpanded={() => setExpand(!expand)} expanded={expand} />
      <Content />
    </div>
  );
}
