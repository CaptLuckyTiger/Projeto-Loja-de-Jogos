import { useEffect, useRef } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    toastRef.current?.focus();
    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
  };

  return (
    <div
      ref={toastRef}
      className="toast-container"
      onClick={onClose}
      role="alert"
      tabIndex="-1"
    >
      <div className="toast" style={{ backgroundColor: bgColors[type] || bgColors.info }}>
        {type === 'success' && (
          <span className="toast-icon" aria-hidden="true">
            ✓
          </span>
        )}
        {type === 'error' && (
          <span className="toast-icon error" aria-hidden="true">
            ✕
          </span>
        )}
        {message}
      </div>
    </div>
  );
}