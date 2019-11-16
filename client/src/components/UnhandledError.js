import React from 'react';

//for all else errors, user will be redirect and
//webpage will render the following content
export default () => {
  return (
    <div>
    <hr/>
      <div className="bounds">
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </div>
  );
};
