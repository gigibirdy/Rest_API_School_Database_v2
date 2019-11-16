import React from 'react';

//if user is trying to update someone else's owned course,
//user will be redirect and webpage will render the following content
export default () => {
  return (
    <div>
    <hr/>
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
      </div>
    </div>
  );
};
