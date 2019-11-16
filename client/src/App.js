import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' render={({...routeProps})=> <Courses {...routeProps}/>}/>
        <PrivateRoute exact path='/courses/create' component={CreateCourse}/>
        <Route exact path='/courses/:id' render={({...routeProps}) => <CourseDetail {...routeProps}/>}/>
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourse}/>
        <Route exact path='/signin' render={({...routeProps}) => <UserSignIn {...routeProps}/>}/>
        <Route exact path='/signout' render={() => <Redirect to='/' />}/>
        <Route exact path='/signup' render={({...routeProps}) => <UserSignUp {...routeProps}/>}/>
        <Route exact path='/error' render={({...routeProps}) => <UnhandledError {...routeProps}/>}/>
        <Route exact path='/forbidden' render={({...routeProps}) => <Forbidden {...routeProps}/>}/>
        <Route exact path='/notfound' render={({...routeProps}) => <NotFound {...routeProps}/>}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}
