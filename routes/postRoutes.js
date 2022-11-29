const express = require('express');
const router = express.Router();
const {
	getPosts,
	getUserPosts,
	createPost,
	updatePost,
	deletePost,
} = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/all', getPosts);

router.get('/', protect, getUserPosts);

router.post('/', protect, createPost);

router.put('/:id', protect, updatePost);

router.delete('/:id', protect, deletePost);

module.exports = router;
