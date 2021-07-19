import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const initialState = {
  location: '',
  bio: '',
  twitter: '',
  facebook: '',
  youtube: '',
  instagram: '',
};

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, profile, getCurrentProfile]);

  const { location, bio, twitter, facebook, youtube, instagram } = formData;

  return (
    <div className='dashboard-wrapper'>
      {/* <h1 className='large text-primary dashboard-title'>Dashboard</h1> */}
      <p className='lead dashboard-welcome'>
        <i className='fas fa-user' />
        {user && user.name}
      </p>
      {profile !== null ? (
        <div className='dashboard'>
          <div className='dashboard-social'>
            <ul className='socials'>
              <li class='twitter'>
                <a href={twitter}>
                  <i className='fab fa-twitter fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>twitter</p>
                  </div>
                </a>
              </li>
              <li class='facebook'>
                <a href={facebook}>
                  <i className='fab fa-facebook fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>facebook</p>
                  </div>
                </a>
              </li>
              <li class='youtube'>
                <a href={youtube}>
                  <i className='fab fa-youtube fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>youtube</p>
                  </div>
                </a>
              </li>
              <li class='instagram'>
                <a href={instagram}>
                  <i className='fab fa-instagram fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>instagram</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className='dashboard-bio-wrapper'>
            <p className='lead'>About</p>{' '}
            <div className='dashboard-bio'>{bio}</div>
          </div>
          <div className='dashboard-location-wrapper'>
            <div className='dashboard-location'>{location}</div>
          </div>
          <DashboardActions className='dashboard-actions' />

          <div className='my-2 dashboard-delete'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <h4>Delete Account</h4>
            </button>
          </div>
        </div>
      ) : (
        <div className='dashboard'>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
