import React, {Component} from 'react';
import {Consumer} from './Context';
import {Redirect, Link} from 'react-router-dom';
import UnhandledError from './UnhandledError';

class UserSignIn extends Component {
  state={
    status: 0
  };

  render(){
    let {from} = this.props.location.state || {from: {pathname: '/'}};
    //if running into unhandled error, redirect to error page
    if(this.state.status === 500)
      return <Redirect exact to='/error' render={() => <UnhandledError />}/>

    return(
      <Consumer>
        {({actions, emailAddress, password}) => (
            <div>
            <hr/>
              <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                  {
                    ((!emailAddress || !password) && this.state.status === 400)
                  ?
                    <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                      <div className="validation-errors">
                        <ul>
                        {
                          (!emailAddress)
                        ? <li>Please provide email address</li>
                        : ''
                        }
                        {
                          (!password)
                        ? <li>Please provide password</li>
                        : ''
                        }
                        </ul>
                      </div>
                    </div>
                  : ''
                  }
                  {
                    (this.state.status === 401)
                  ?
                    <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                      <div className="validation-errors">
                        <ul>
                          <li>Invalid username or password</li>
                        </ul>
                      </div>
                    </div>
                  : ''
                  }
                  <form onSubmit={async (e) => { e.preventDefault(); const status = await actions.handleSignIn(); this.setState({status: status}); if(status === 200) { this.props.history.replace(from);}}}>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={emailAddress} onChange={actions.handleChange}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={actions.handleChange}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push('/');}}>Cancel</button></div>
                  </form>
                </div>
              <p>&nbsp;</p>
              <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
};

export default UserSignIn;
