import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addLike,
  removeLike,
  deleteReview,
  getReviews,
} from '../../actions/review';

const ReviewItem = ({
  auth,
  addLike,
  removeLike,
  deleteReview,
  review: { _id, user, likes, comments, date, title, author, name },
  showActions,
  getReviews,
}) => {
  const handleDelete = async (_id) => {
    await deleteReview(_id);
    await getReviews();
  };
  return (
    <div className='reviews-wrapper'>
      <div className='reviews-item'>
        <h2 className='reviews-title'>{title}</h2>
        <h3 className='reviews-author'>by {author}</h3>
        <div className='reviews-user'>
          <h4 className='user'>
            <p>Review by</p>
            <div className='m2px' />
            <Link to={`/profile/${user}`}>
              {` `}
              {name}
            </Link>
          </h4>
        </div>
        <p className='reviews-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <div className='reviews-panel'>
            <button
              onClick={() => addLike(_id)}
              type='button'
              className='like btn btn-light like-dislike'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>
                {likes.length > 0 && <span className='ml'>{likes.length}</span>}
              </span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light like-dislike'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <Link
              to={`/reviews/${_id}`}
              className='btn btn-primary like-dislike'
            >
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count ml'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => handleDelete(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ReviewItem.defaultProps = {
  showActions: true,
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  deleteReview: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deleteReview,
  getReviews,
})(ReviewItem);
