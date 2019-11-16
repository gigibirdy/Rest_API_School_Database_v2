import React from 'react';
import {Consumer} from './Context';
import {Route, Redirect} from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  //if user is authenticated user, render the proper page otherwise
  //redirect user to sign in page
  return (
    <Consumer>
      {({authenticatedUser}) => (
        <Route
          {...rest}
          render={props => (authenticatedUser)
          ? (
          <Component {...props} />
          ) : (
          <Redirect to={{
            pathname: '/signin',
            state: {from: props.location}}}/>
          )}
        />
      )}
    </Consumer>
  );
};
