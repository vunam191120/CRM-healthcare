import React from 'react';
import { FaBed } from 'react-icons/fa';

export default function RoomDiagram() {
  return (
    <div className="diagram-container">
      <h5 className="title">Room Diagram</h5>
      <div className="diagram-content">
        <div className="room">
          <div className="bed-list">
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
            <div className="bed-item">
              <FaBed className="bed-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
