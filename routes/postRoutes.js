const express = require('express');
const router = express.Router();
const {
	getPosts,
	getUserPosts,
	createPost,
	updatePost,
	deletePost,
} = require('../controllers/postController');

router.get('/', getPosts);

router.get('/:id', getUserPosts);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;
