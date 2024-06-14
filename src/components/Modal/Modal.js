// components/Modal/Modal.js

import React from 'react';
import './Modal.css'; // Ensure you have corresponding CSS for Modal

const Modal = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
