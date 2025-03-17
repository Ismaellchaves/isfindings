
import React from 'react';

const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="ios-status-bar">
      <div className="text-sm font-medium">{currentTime}</div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 18V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V18C21 18.9428 21 19.4142 20.7071 19.7071C20.4142 20 19.9428 20 19 20H5C4.05719 20 3.58579 20 3.29289 19.7071C3 19.4142 3 18.9428 3 18Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M15 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 15.5V12.5C2 10.1987 2 9.04804 2.43597 8.18561C2.81947 7.42237 3.42237 6.81947 4.18561 6.43597C5.04804 6 6.19869 6 8.5 6H15.5C17.8013 6 18.952 6 19.8144 6.43597C20.5776 6.81947 21.1805 7.42237 21.564 8.18561C22 9.04804 22 10.1987 22 12.5V15.5C22 17.8013 22 18.952 21.564 19.8144C21.1805 20.5776 20.5776 21.1805 19.8144 21.564C18.952 22 17.8013 22 15.5 22H8.5C6.19869 22 5.04804 22 4.18561 21.564C3.42237 21.1805 2.81947 20.5776 2.43597 19.8144C2 18.952 2 17.8013 2 15.5Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9 6V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 16V18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="w-5 h-5">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L12 8.34315L15.1716 5.17157C16.7337 3.60948 19.2663 3.60948 20.8284 5.17157C22.3905 6.73367 22.3905 9.26633 20.8284 10.8284L12 19.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
