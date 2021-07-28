import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewItem from './ReviewItem';
import { getReviews } from '../../actions/review';

const Reviews = ({ getReviews, review: { reviews } }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <Fragment>
      <h1 className='large text-primary text-center'>Reviews</h1>
      <div className='reviews-page-wrapper'>
        <div className='reviews'>
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReviews })(Reviews);
