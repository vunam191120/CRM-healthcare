import React from 'react';
// import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import Button from './../Button';

function Modal({ isOpen, message, onClose, onConfirm, header, buttonTitle }) {
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal__container">
            <div className="modal__header">
              {/* {!icon ? (
                <IoIosCloseCircleOutline color="#f15e5e" size="100px" />
              ) : (
                icon
              )}
              <h4 className="modal__title">{title}</h4>
              <div className="modal__close-btn" onClick={onClose}>
                <IoClose
                  className="modal__close-icon"
                  color="#999"
                  size="1.5rem"
                />
              </div> */}
              <div className="modal__close-btn" onClick={onClose}>
                <IoClose className="modal__close-icon" />
              </div>
              {header}
            </div>
            <div className="modal__body">{message}</div>
            <div className="modal__footer">
              <Button className="btn button--light" handleClick={onClose}>
                Cancel
              </Button>
              <Button className="btn button--main" handleClick={onConfirm}>
                {!buttonTitle ? 'Confirm' : buttonTitle}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
