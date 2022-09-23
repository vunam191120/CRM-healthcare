import React from 'react';

export default function Button({
  disabled,
  type,
  className,
  children,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    >
      <span>{children}</span>
    </button>
  );
}
