import React from 'react';

export default function Button({ className, children, handleClick }) {
  return (
    <button onClick={handleClick} className={className}>
      <span>{children}</span>
    </button>
  );
}
