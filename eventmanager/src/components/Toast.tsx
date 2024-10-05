import React, { useEffect } from 'react';
import './Toast.css'; // Ensure to create this CSS file for styling

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
