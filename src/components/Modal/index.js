import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import Button from '../Button';

function Modal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  icon,
  buttonTitle,
  body,
}) {
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="popup__container">
            <div className="popup__header">
              {!icon ? (
                <IoIosCloseCircleOutline color="#f15e5e" size="100px" />
              ) : (
                icon
              )}
              <h4 className="popup__title">{title}</h4>
              <div className="popup__close-btn" onClick={onClose}>
                <IoClose
                  className="popup__close-icon"
                  color="#999"
                  size="1.5rem"
                />
              </div>
            </div>
            <div className="popup__body">
              <div>{message}</div>
            </div>
            <div className="popup__footer">
              <Button className="btn btn--light" onClick={onClose}>
                Cancel
              </Button>
              <Button className="btn btn--main" onClick={onConfirm}>
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
