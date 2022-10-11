import React from 'react';

export default function Tag({ status }) {
  return (
    <div className={`tag ${status === true ? 'tag--active' : 'tag--disabled'}`}>
      {status === true ? 'Active' : 'Disabled'}
    </div>
  );
}
