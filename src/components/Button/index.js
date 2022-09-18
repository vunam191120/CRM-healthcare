import React from 'react';

export default function Button({ type, className, children, onClick }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      <span>{children}</span>
    </button>
  );
}
