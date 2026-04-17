import { useEffect } from 'react';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  const isError = type === 'error';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div className={`rounded-xl px-6 py-4 text-white font-semibold shadow-xl flex items-center gap-3 ${
        isError 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-green-600 hover:bg-green-700'
      } transition cursor-pointer`} onClick={() => onClose && onClose()}>
        <span className="text-xl">
          {isError ? '❌' : '✅'}
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
