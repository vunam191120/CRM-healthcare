import React from 'react';
import RoomDiagram from '../../../../../components/RoomDiagram';

export default function BedForm({ mode }) {
  return (
    <div className="bed-content-detail">
      <div className="header">
        <h4 className="title">Create bed</h4>
      </div>
      <div className="bed-form-content">
        <RoomDiagram />
      </div>
    </div>
  );
}
