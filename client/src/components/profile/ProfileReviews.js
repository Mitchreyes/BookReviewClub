import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReviews } from '../../actions/review';
import ReviewItem from '../reviews/ReviewItem';

const ProfileReviews = ({
  getReviews,
  review: { reviews },
  profile: { user },
}) => {
  let userReviews = reviews.filter((review) => review.user === user._id);
  console.log(userReviews);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  // let userReviews = reviews.filter((review) => review.user === user._id);
  // console.log(userReviews);
  return (
    <div className='profile-reviews-wrapper'>
      <div className='profile-reviews-header text-center'>
        <h1>{user.name}'s Book Reviews</h1>
      </div>
      <div className='reviews'>
        {userReviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>{' '}
    </div>
  );
};

ProfileReviews.propTypes = {
  profile: PropTypes.object.isRequired,
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReviews })(ProfileReviews);
