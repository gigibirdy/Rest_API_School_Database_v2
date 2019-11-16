import React, {Component} from 'react';
import {Consumer} from './Context';
import UnhandledError from './UnhandledError';
import {Redirect} from 'react-router-dom';

class CreateCourse extends Component {
  state = {
    title: '',
    estimatedTime: '',
    materialsNeeded: '',
    description: '',
    status: 0
  };

  //update the state
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };

  render(){
    const data = {
      title: this.state.title,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
      description: this.state.description
    }
    //if running into unhandled error, redirect to error page
    if(this.state.status === 500)
      return <Redirect exact to='/error' render={() => <UnhandledError />}/>
      
    return(
      <Consumer>
        {({actions, authenticatedUser}) => (
          <div>
          <hr/>
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
              {
                ((!this.state.title || !this.state.description) && this.state.status === 400)
              ? <div>
                  <h2 className="validation--errors--label">Validation errors</h2>
                  <div className="validation-errors">
                    <ul>
                    {
                      (!this.state.title)
                    ? <li>Please provide a value for "Title"</li>
                    : ''
                    }
                    {
                      (!this.state.description)
                    ? <li>Please provide a value for "Description"</li>
                    : ''
                    }
                    </ul>
                  </div>
                </div>
              : ''
              }
                <form onSubmit={async (e) => {e.preventDefault(); const status = await actions.handleCreateCourse({...data, userId: authenticatedUser.id}); this.setState({status: status}); if(status === 201) {this.props.history.push('/');}}}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        value={this.state.title}  onChange={this.handleChange}/></div>
                      <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleChange}></textarea></div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                              placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange}/></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleChange}></textarea></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.goBack()}}>Cancel</button></div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
};

export default CreateCourse;
