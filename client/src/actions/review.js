import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_REVIEWS,
  REVIEW_ERROR,
  GET_REVIEW,
  POST_REVIEW,
  DELETE_REVIEW,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get all reviews
export const getReviews = () => async (dispatch) => {
  try {
    const res = await api.get('/reviews');

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

// Get Review by Id

export const getReview = (reviewId) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/${reviewId}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Post Review

export const postReview = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/reviews', formData);

    dispatch({
      type: POST_REVIEW,
      payload: res.data,
    });

    dispatch(setAlert('Review Posted', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

//Delete Review

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    const res = await api.delete(`/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: res.data,
    });

    dispatch(setAlert('Review deleted', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/reviews/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/reviews/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

// Add Comment
export const addComment = (reviewId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/comment/${reviewId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: await err.response.statusText,
        status: await err.response.status,
      },
    });
  }
};

// Delete Comment
export const deleteComment = (reviewId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/reviews/comment/${reviewId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
