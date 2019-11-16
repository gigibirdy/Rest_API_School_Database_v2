import React from 'react';
import {Consumer} from './Context';
import {Link} from 'react-router-dom';

export default () => {
//sign out user
  return(
    <Consumer>
      {({actions}) => (
        <Link className="signout" to="/signout" onClick={actions.handleSignOut}>Sign Out</Link>
      )}
    </Consumer>
  );
};
