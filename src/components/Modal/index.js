import React from 'react';

function Modal({ renderBody, className, isOpen, onClickClose }) {
  return (
    isOpen && (
      <div className={`modal__overlay ${className}`}>{renderBody()}</div>
    )
  );
}

export default Modal;
