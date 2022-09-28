import React from 'react';

export default function RoomDiagram({ renderBeds, roomID }) {
  return (
    <div className="diagram-container">
      <div className="diagram-content">
        <h4 className="title-room">Room {roomID}</h4>
        <div className="room">
          <div className="bed-list">{renderBeds()}</div>
        </div>
      </div>
    </div>
  );
}
