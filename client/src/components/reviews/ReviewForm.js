import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { postReview } from '../../actions/review';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router-dom';

const ReviewForm = ({ postReview }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let review = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    postReview({ title, author, review });
    setIsSubmitted((current) => !current);
    // setTitle('');
    // setAuthor('');
    // setEditorState('');
  };

  if (isSubmitted) {
    return <Redirect to='/reviews' />;
  }

  return (
    <div className='review-form-wrapper'>
      <div className='review-form-title'>
        <h3>Create a review</h3>
      </div>
      <form className='review-form' onSubmit={handleSubmit}>
        <div className='review-form-header'>
          <div className='input-fields'>
            <input
              className='input'
              name='title'
              cols='30'
              rows='5'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='input-fields'>
            <input
              className='input-fields input'
              name='author'
              cols='30'
              rows='5'
              placeholder='Author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='editorWrapper'>
          <Editor
            EditorState={editorState}
            toolbarClassName='draftToolbar'
            wrapperClassName='draftWrapper'
            editorClassName='draftEditor'
            onEditorStateChange={setEditorState}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
        <input
          type='submit'
          className='btn btn-dark my-1 submit-btn'
          value='Submit'
        />
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  postReview: PropTypes.func.isRequired,
};

export default connect(null, { postReview })(ReviewForm);
