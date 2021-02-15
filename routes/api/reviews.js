const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Review = require('../../models/Review');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/review
// @desc     Create a review
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  check('author', 'Author is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.notEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newReview = new Review({
        text: req.body.text,
        name: user.name,
        author: req.body.author,
        title: req.body.title,
        user: req.user.id,
      });

      const review = await newReview.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/reviews
// @desc     Get all reviews
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/reviews/:id
// @desc     Get review by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.json(review);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/reviews/:id
// @desc     Delete a review
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Check user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await review.remove();

    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/reviews/like/:id
// @desc     Like a review
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await review.findById(req.params.id);

    // Check if the review has already been liked
    if (review.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Review already liked' });
    }

    review.likes.unshift({ user: req.user.id });

    await review.save();

    return res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/reviews/unlike/:id
// @desc     Unlike a review
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Check if the review has not yet been liked
    if (!review.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Review has not yet been liked' });
    }

    // remove the like
    review.likes = review.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await review.save();

    return res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/reviews/comment/:id
// @desc     Comment on a review
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const review = await Review.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      review.comments.unshift(newComment);

      await review.save();

      res.json(review.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/reviews/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Pull out comment
    const comment = review.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    review.comments = review.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await review.save();

    return res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
