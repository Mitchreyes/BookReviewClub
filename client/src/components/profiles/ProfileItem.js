import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    location,
  },
}) => {
  return (
    <div className='profiles bg-light'>
      <p className='profiles-location'>{location && <span>{location}</span>}</p>
      <h2 className='profiles-name'>{name}</h2>
      <Link to={`/profile/${_id}`} className='profiles-btn btn btn-primary'>
        <span>View Profile</span>
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
