import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='register-wrapper'>
      <p className='lead register-title'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='register-form' onSubmit={onSubmit}>
        <div className='input-fields register'>
          <input
            className='input'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            autoComplete='new-password'
          />
        </div>
        <div className='input-fields register'>
          <input
            className='input'
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            autoComplete='new-password'
          />
        </div>
        <div className='input-fields register'>
          <input
            className='input'
            type='password'
            placeholder='Password (Must be 6 characters)'
            name='password'
            value={password}
            onChange={onChange}
            autoComplete='new-password'
          />
        </div>
        <div className='input-fields register'>
          <input
            className='input'
            type='password'
            placeholder='Verify Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          className='register-btn btn btn-primary'
          value='Register'
        />
      </form>
      <p className='my-3'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
