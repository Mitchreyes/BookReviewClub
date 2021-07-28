import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewItem from '../reviews/ReviewItem';
import { getReviews } from '../../actions/review';

const Home = ({ isAuthenticated, getReviews, review: { reviews } }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='home-wrapper'>
      <h1 className='large  text-center my-2'>Welcome to the Book Club</h1>
      <div className='home-review-button my-3'>
        <Link to='/reviewform' className='btn-primary btn review-btn'>
          Create a review
        </Link>
      </div>
      <div className='home-reviews-wrapper'>
        <div className='home-reviews-title text-center my-2 large'>
          Most recent reviews
        </div>
        <div className='reviews'>
          {reviews.slice(0, 3).map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  review: state.review,
});

export default connect(mapStateToProps, { getReviews })(Home);
