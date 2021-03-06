import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from '../home/Home';
import Dashboard from '../home/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import ProfileForm from '../profile/ProfileForm';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />

        {/* <Route exact path="/profiles" component={Profiles} /> */}
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        {/* <PrivateRoute exact path="/add-experience" component={AddExperience} />
      <PrivateRoute exact path="/add-education" component={AddEducation} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/posts/:id" component={Post} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
