import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-wrapper'>
      <form
        autocomplete='new-password'
        className='login-form'
        onSubmit={onSubmit}
      >
        <div className='input-fields login'>
          <input
            className='login-input input'
            placeholder='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            autocomplete='new-password'
            required
          />
        </div>
        <div className='input-fields login'>
          <input
            className='password-input input'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            autocomplete='new-password'
          />
        </div>
        <input
          type='submit'
          className='login-btn btn btn-primary'
          value='Login'
        />
      </form>
      <p className='my-3'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
