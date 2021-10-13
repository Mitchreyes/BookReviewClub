import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/review';

const CommentItem = ({
  reviewId,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment,
}) => (
  <div className='comment'>
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
    </div>
    <div className='comment-body'>
      <p className='my-1'>{text}</p>
      <p className='comment-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(reviewId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  reviewId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
