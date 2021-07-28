import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/review';

const CommentForm = ({ addComment, reviewId }) => {
  const [text, setText] = useState('');

  return (
    <div className='comment-form'>
      <form
        className='comment-body'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(reviewId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Leave a comment'
          value={text}
          className='my-2'
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type='submit'
          className='comment-btn btn btn-dark'
          value='Submit'
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
