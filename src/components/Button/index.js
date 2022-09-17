import React from 'react';

export default function Button({ type, className, children, handleClick }) {
  return (
    <button type={type} onClick={handleClick} className={className}>
      <span>{children}</span>
    </button>
  );
}
