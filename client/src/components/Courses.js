import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import axios from 'axios';
import UnhandledError from './UnhandledError';

class Courses extends Component {
  state = {
    courses: [],
    status: 0
  }

  //when component first mounted, call searchCourse method
  componentDidMount = () => {
    this.searchCourses();
  };

  //search course by course id
  searchCourses = () => {
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        this.setState({
          courses: response.data.courses
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        this.setState({
          status: error.response.status
        })
      })
  };

  render(){
    //if running into unhandled error, redirect to error page
    if(this.state.status === 500)
      return <Redirect exact to='/error' render={() => <UnhandledError />}/>

    return(
      <div>
      <hr />
        <div className="bounds">
          {this.state.courses.map((course) =>
          <div className="grid-33" key={course.id}>
            <NavLink exact to={`/courses/${course.id}`} className="course--module course--link">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </NavLink>
          </div>
          )}
          <div className="grid-33">
            <NavLink exact to='/courses/create' className="course--module course--add--module">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
};

export default Courses;
