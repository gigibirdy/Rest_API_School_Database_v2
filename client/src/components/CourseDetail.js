import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import axios from 'axios';
import {Consumer} from './Context';
import ReactMarkdown from 'react-markdown';
import NotFound from './NotFound';
import UnhandledError from './UnhandledError';

class CourseDetail extends Component {
  state = {
    currentCourse: [],
    status: 0
  };

  //search a course by id including all course details
  searchCourse = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
          this.setState({
            currentCourse: response.data.course,
          })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
          this.setState({
            status: error.response.status,
          })
      })
  };

  //when this component first mounted, call searchCourse method
  componentDidMount = () => {
    this.searchCourse(this.props.match.params.id)
  };

  render(){
    //if running into unhandled error, redirect to error page
    if (this.state.status === 500) {
      return <Redirect to='/error' render={() => <UnhandledError />}/>
      //if search result comes back...render the following
    } else if (this.state.currentCourse.length > 0) {
    const {owner, title, description, materialsNeeded, estimatedTime, id} = this.state.currentCourse[0];
    return(
      <Consumer>
        {({authenticatedUser, actions}) => (
          <div>
          <hr/>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                {
                  (authenticatedUser && authenticatedUser.id === owner.id)
                ?
                  <span><NavLink className="button" to={`/courses/${id}/update`}>Update Course</NavLink>
                  <button className="button" onClick={async (e) => {e.preventDefault(); const status = await actions.handleDeleteCourse(id); this.setState({status: status}); if(status === 204) {this.props.history.push('/');}}}>Delete Course</button></span>
                : ''
                }
                  <NavLink className="button button-secondary" to='/'>Return to List</NavLink>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{title}</h3>
                  <p>By {owner.firstName} {owner.lastName}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                      {
                        (materialsNeeded)
                      ? <ReactMarkdown source={materialsNeeded} />
                      : ' '
                      }
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
    //if no search result, redirect to notfound page
    } else if (this.state.status === 404){
      return <Redirect to='/notfound' render={() => <NotFound />}/>
    }
    return null;
  }
};

export default CourseDetail;
