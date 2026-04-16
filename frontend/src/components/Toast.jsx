const Toast = ({ message, type }) => {
  const isError = type === 'error';
  
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div className={`rounded-xl px-6 py-4 text-white font-semibold shadow-xl flex items-center gap-3 ${
        isError 
          ? 'bg-gradient-to-r from-red-600 to-red-700' 
          : 'bg-gradient-to-r from-green-600 to-green-700'
      }`}>
        <span className="text-xl">
          {isError ? '❌' : '✅'}
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
