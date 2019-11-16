import React from 'react';
import {Consumer} from './Context';
import UserSignOut from './UserSignOut';
import {Link} from 'react-router-dom';

export default () => {
  //if user is authenticated, render user name and the sign out button,
  // otherwise render sign in and sign out button
  return(
    <Consumer>
      {({authenticatedUser}) => (
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            {
              (authenticatedUser)
            ?
              <nav>
                <span>Welcome {authenticatedUser.firstName} {authenticatedUser.lastName}</span>
                <UserSignOut />
              </nav>
            :
              <nav>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </nav>
            }
          </div>
        </div>
      )}
    </Consumer>
  );
};
