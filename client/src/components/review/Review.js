import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReview } from '../../actions/review';
import ReviewItemSpecific from '../reviews/ReviewItemSpecific';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Review = ({ getReview, review: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);
  return loading || review === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/reviews' className='backbtn btn btn-dark'>
        Back To Reviews
      </Link>
      <ReviewItemSpecific review={review} showActions={false} />
      <CommentForm reviewId={review._id} />
      <div className='comments'>
        {review.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            reviewId={review._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReview })(Review);
