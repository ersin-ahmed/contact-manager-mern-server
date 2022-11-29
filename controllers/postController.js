const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

// @Desc Get All Posts
// @Route GET /api/posts
// @Access Public
const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find();

	res.status(200).json(posts);
});

// @Desc Get Users Posts
// @Route GET /api/posts/
// @Access Private
const getUserPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({ user: req.user.id });

	res.status(200).json(posts);
});

// @Desc Create Post
// @Route POST /api/posts
// @Access Private
const createPost = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field!');
	}

	const post = await Post.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(post);
});

// @Desc Update Post
// @Route PUT /api/posts/:id
// @Access Private
const updatePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		res.status(400);
		throw new Error('Post not found');
	}

	const user = await User.findById(req.user.id);

	// Check for user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the post user
	if (post.user.toString() !== user.id) {
		res.status(401);
		throw new Error('Unauthorized');
	}

	const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json({ updatedPost });
});

// @Desc Delete Post
// @Route DELETE /api/posts/:id
// @Access Private
const deletePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		res.status(400);
		throw new Error('Post not found');
	}

	const deletedPost = await Post.findByIdAndDelete(req.params.id);

	res.status(200).json(deletedPost._id);
});

module.exports = {
	getPosts,
	getUserPosts,
	createPost,
	updatePost,
	deletePost,
};
