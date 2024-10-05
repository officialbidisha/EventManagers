import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ message: string; type: 'success' | 'error' }[]>([]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToasts((prev) => [...prev, { message, type }]);
  };

  const handleClose = (index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          onClose={() => handleClose(index)}
        />
      ))}
    </ToastContext.Provider>
  );
};
