import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Consumer} from './Context';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';

class UpdateCourse extends Component {
  state = {
      currentCourse: [],
      title: '',
      estimatedTime: '',
      materialsNeeded: '',
      description: '',
      status: 0
  }

  //search course by id
  searchCourse = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          currentCourse: response.data.course,
          title: response.data.course[0].title,
          description: response.data.course[0].description,
        });
        if(response.data.course[0].estimatedTime){
          this.setState({
            estimatedTime: response.data.course[0].estimatedTime
          })
        };
        if(response.data.course[0].materialsNeeded){
          this.setState({
            materialsNeeded: response.data.course[0].materialsNeeded
          })
        };
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({
          status: error.response.status
        })
      })
  };

  //when the component first mounted, call searchCourse method
  componentDidMount = () => {
    this.searchCourse(this.props.match.params.id);
  }

  //update the state
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };

  render(){
    //if user is not the course owner, redirect to forbidden page
    if (this.state.status === 403){
      return <Redirect exact to='/forbidden' render={() => <Forbidden />}/>
    //if running into unhandled error, redirect to error page
    } else if (this.state.status === 500){
      return <Redirect exact to='/error' render={() => <UnhandledError />}/>
    //if search result comes back, render the following content
    } else if(this.state.currentCourse.length > 0){
      const data = {
        title: this.state.title,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded,
        description: this.state.description
      }
      const {firstName, lastName} = this.state.currentCourse[0].owner;
      return(
        <Consumer>
          {({actions, authenticatedUser}) => (
            <div>
            <hr/>
              <div className="bounds course--detail">
                <h1>Update Course</h1>
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
                  <form onSubmit={async (e) => {e.preventDefault(); const status = await actions.handleUpdateCourse(this.state.currentCourse[0].id, data); this.setState({status: status}); if(status === 204) {this.props.history.push(`/courses/${this.state.currentCourse[0].id}`);}}}>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                          value={this.state.title} onChange={this.handleChange}/></div>
                        <p>By {firstName} {lastName}</p>
                      </div>
                      <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..."
                        value={this.state.description} onChange={this.handleChange}></textarea></div>
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
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                            value={this.state.materialsNeeded} onChange={this.handleChange}></textarea></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={(e) => {e.preventDefault(); this.props.history.push(`/courses/${this.state.currentCourse[0].id}`)}}>Cancel</button></div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Consumer>
      );
    } else if (this.state.status === 404){
      return <Redirect exact to='/notfound' render={() => <NotFound />}/>
    }
    return null;
  }
};

export default UpdateCourse;
