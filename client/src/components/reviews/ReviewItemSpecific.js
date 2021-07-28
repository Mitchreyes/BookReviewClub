import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deleteReview } from '../../actions/review';
import ReactHtmlParser from 'react-html-parser';

const ReviewItemSpecific = ({
  auth,
  review: { _id, user, likes, comments, date, title, review, author, name },
  showActions,
}) => {
  const htmlReview = ReactHtmlParser(review);

  return (
    <div className='review-wrapper'>
      {/* <div className='user'>
        <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div> */}
      <div className='review-body'>
        <div className='review-title'>
          <h1 className='large-title'>{title}</h1>
        </div>
        <div className='review-author'>
          <h2>by {author}</h2>
        </div>
        <div className='review-user'>
          <h4 className='user'>
            <p>Review by</p>
            <div className='m2px' />
            <Link to={`/profile/${user}`}>
              {` `}
              {name}
            </Link>
          </h4>
        </div>
        <div className='review-review'>{htmlReview}</div>
        <p className='review-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/reviews/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteReview(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

ReviewItemSpecific.defaultProps = {
  showActions: true,
};

ReviewItemSpecific.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  deleteReview: PropTypes.func.isRequired,
  ReactHtmlParser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ReactHtmlParser,
  addLike,
  removeLike,
  deleteReview,
})(ReviewItemSpecific);
