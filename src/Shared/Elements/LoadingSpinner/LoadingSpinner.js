import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    // <div className={`spinner ${props.classSpinner}`}>
    //   <div className="lds-hourglass"></div>
    // </div>
    <div className={`spinner ${props.classSpinner}`}>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>

    // <div className={`spinner ${props.classSpinner}`}>
    //   <div class="sk-folding-cube">
    //     <div class="sk-cube1 sk-cube"></div>
    //     <div class="sk-cube2 sk-cube"></div>
    //     <div class="sk-cube4 sk-cube"></div>
    //     <div class="sk-cube3 sk-cube"></div>
    //   </div>
    // </div>

  );
};

export default LoadingSpinner;
