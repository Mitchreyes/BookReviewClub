import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from '../home/Home';
import Dashboard from '../home/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import ProfileForm from '../profile/ProfileForm';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Reviews from '../reviews/Reviews';
import NotFound from '../layout/NotFound';
import Review from '../review/Review';
import ReviewForm from '../reviews/ReviewForm';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/reviews' component={Reviews} />
        <PrivateRoute exact path='/reviews/:id' component={Review} />
        <PrivateRoute exact path='/reviewform' component={ReviewForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
