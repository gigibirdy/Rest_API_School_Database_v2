import React, {Component} from 'react';
import {Consumer} from './Context';
import UnhandledError from './UnhandledError';
import {Redirect, Link} from 'react-router-dom';

class UserSignUp extends Component {
  state = {
    status: 0,
    errorMessage: ''
  };

  render(){
    //if running into unhandled error, redirect to error page
    if(this.state.status === 500)
      return <Redirect exact to='/error' render={() => <UnhandledError />}/>
    //render user sign up page
    return(
      <Consumer>
        {({actions, emailAddress, password, firstName, lastName, confirmPassword}) => (
        <div>
        <hr/>
          <div className="bounds">
            <div className="grid-33 centered signin">
              <h1>Sign Up</h1>
              <div>
                {
                  (this.state.status === 400)
                ? <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                      <ul>
                      {
                        (this.state.errorMessage.includes('notEmpty on firstName'))
                      ? <li>Please provide first name (alphabetical letters only)</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('notEmpty on lastName'))
                      ? <li>Please provide last name (alphabetical letters only)</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('Existing email address'))
                      ? <li>This email Address is already registered. Please sign in.</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('notEmpty on emailAddress'))
                      ? <li>Please provide email address</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('isEmail'))
                      ? <li>Email address is not valid</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('notEmpty on password'))
                      ? <li>Please provide password</li>
                      : ''
                      }
                      {
                        (this.state.errorMessage.includes('Password confirmation is not identical as password'))
                      ? <li>Password confirmation is not identical as password</li>
                      : ''
                      }
                      </ul>
                    </div>
                  </div>
                : ''
                }
                <form onSubmit={async (e) => {e.preventDefault(); const response = await actions.handleSignUp(); this.setState({status: response.status, errorMessage: response.data.message}); if(response.status === 201) {actions.handleSignIn(); this.props.history.push('/')}}}>
                  <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={actions.handleChange}/></div>
                  <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={actions.handleChange}/></div>
                  <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={actions.handleChange}/></div>
                  <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={actions.handleChange}/></div>
                  <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                      value={confirmPassword} onChange={actions.handleChange}/></div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push('/')}}>Cancel</button></div>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
          </div>
        </div>
        )}
      </Consumer>
    );
  }
};

export default UserSignUp;
