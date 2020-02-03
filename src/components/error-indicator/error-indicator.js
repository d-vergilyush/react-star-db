import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <span className="msg">Whoops!</span>
      <span>
        Looks like something went sideways...
      </span>
      <span>
        ...but we already sent droids to fix it!
      </span>
    </div>
  );
};

export default ErrorIndicator;
