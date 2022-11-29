const asyncHandler = require('express-async-handler');

// @Desc Get All Posts
// @Route GET /api/posts
// @Access Public
const getPosts = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get Posts' });
});

// @Desc Get Users Posts
// @Route GET /api/posts/:UserId
// @Access Private
const getUserPosts = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get Users Posts' });
});

// @Desc Create Post
// @Route POST /api/posts
// @Access Private
const createPost = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}

	res.status(200).json({ message: 'Create Post' });
});

// @Desc Update Post
// @Route PUT /api/posts/:id
// @Access Private
const updatePost = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update Post ${req.params.id}` });
});

// @Desc Delete Post
// @Route DELETE /api/posts/:id
// @Access Private
const deletePost = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete Post ${req.params.id}` });
});

module.exports = {
	getPosts,
	getUserPosts,
	createPost,
	updatePost,
	deletePost,
};
