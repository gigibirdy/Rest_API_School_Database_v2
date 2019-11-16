import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const dbContext = React.createContext();

export class Provider extends Component {
  state={
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: '',
    emailAddress: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };

  //sign up an new user
  handleSignUp = async () => {
    try{
      if(this.state.password === this.state.confirmPassword){
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/api/users',
          data: {
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          }
        });
        return response;
      } else {
        return {
          status: 400,
          data: {
            message: "Password confirmation is not identical as password"
          }
        }
      }
    } catch (error) {
      return error.response;
    }
  };

  //handle user sign in
  handleSignIn = async () => {
    try{
      const response = await axios.get('http://localhost:5000/api/users', {
        auth: {
          username: this.state.emailAddress,
          password: this.state.password,
        },
        responseType: 'json',
        responseEncoding: 'utf8',
      });
      //if user exists, update the authenticatedUser state and persist user record in a cookie
      if(response) {
        this.setState({
          authenticatedUser: response.data.user,
          emailAddress: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });
        Cookies.set('authenticatedUser', JSON.stringify(response.data.user), {expires: 1});
        return response.status;
      }
    } catch (error) {
      return error.response.status;
    }
  };

  //sign out user and remove cookie
  handleSignOut = () => {
    this.setState({
      authenticatedUser: null,
    });
    Cookies.remove('authenticatedUser');
  };

  //handle update a course
  handleUpdateCourse = async (id, data) => {
    try{
      const response = await axios({
        method: 'put',
        url: 'http://localhost:5000/api/courses/' + id,
        data: data,
        auth: {
          username: this.state.authenticatedUser.emailAddress,
          password: this.state.authenticatedUser.password
        }
      });
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  };

  //handle create a new course
  handleCreateCourse = async (data) => {
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/courses',
        data: data,
        auth: {
          username: this.state.authenticatedUser.emailAddress,
          password: this.state.authenticatedUser.password
        }
      });
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  };

  //handle delete a course
  handleDeleteCourse = async (id) => {
    try{
      const response = await axios({
        method: 'delete',
        url: 'http://localhost:5000/api/courses/' + id,
        auth: {
          username: this.state.authenticatedUser.emailAddress,
          password: this.state.authenticatedUser.password
        }
      });
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  };

  render(){
    return (
      //Provider component provides the application state and any actions
      //that need to be shared between components
      <dbContext.Provider value={{
        authenticatedUser: this.state.authenticatedUser,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        confirmPassword: this.state.confirmPassword,
        actions: {
          handleChange: this.handleChange,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          handleSignUp: this.handleSignUp,
          handleUpdateCourse: this.handleUpdateCourse,
          handleCreateCourse: this.handleCreateCourse,
          handleDeleteCourse: this.handleDeleteCourse
        }
      }}>
        {this.props.children}
      </dbContext.Provider>
    );
  }
};
//Consumer component automatically connects the component wrapped in it to all actions and context changes
export const Consumer = dbContext.Consumer;

//alternative option to export a higher-order function automatically connects
//the component passed to it to all actions and context changes
// export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }
