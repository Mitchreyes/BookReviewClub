import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    social: { twitter, facebook, youtube, instagram },
    location,
    user: { name },
    bio,
  },
}) => {
  return (
    <div className='dashboard-wrapper'>
      <div className='profile-top-welcome'>
        <p className='lead dashboard-welcome'>{name}</p>
      </div>
      <div className='dashboard'>
        <div className='dashboard-social'>
          <ul className='socials'>
            {twitter !== '' ? (
              <li className='twitter'>
                <a href={twitter}>
                  <i className='fab fa-twitter fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>twitter</p>
                  </div>
                </a>
              </li>
            ) : null}
            {facebook !== '' ? (
              <li className='facebook'>
                <a href={facebook}>
                  <i className='fab fa-facebook fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>facebook</p>
                  </div>
                </a>
              </li>
            ) : null}
            {youtube !== '' ? (
              <li className='youtube'>
                <a href={youtube}>
                  <i className='fab fa-youtube fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>youtube</p>
                  </div>
                </a>
              </li>
            ) : null}
            {instagram !== '' ? (
              <li className='instagram'>
                <a href={instagram}>
                  <i className='fab fa-instagram fa-2x' aria-hidden='true' />
                  <div className='slider'>
                    <p>instagram</p>
                  </div>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div className='dashboard-bio-wrapper'>
          <p className='lead'>About</p>{' '}
          <div className='dashboard-bio'>{bio}</div>
        </div>
        <p className='lead dashboard-wrapper'>
          <div className='dashboard-location'>{location}</div>
        </p>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
