const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel');
const User = require('../models/userModel');

// @Desc Get All Contacts
// @Route GET /api/contacts/all
// @Access Public
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find();

	res.status(200).json(contacts);
});

// @Desc Get Users Contacts
// @Route GET /api/contacts
// @Access Private
const getUserContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({ user: req.user.id });

	res.status(200).json(contacts);
});

// @Desc Create Contact
// @Route POST /api/contacts
// @Access Private
const createContact = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please add a name field!');
	}

	const contact = await Contact.create({
		name: req.body.name,
		number: req.body.number,
		email: req.body.email,
		address: req.body.address,
		user: req.user.id,
	});

	res.status(200).json(contact);
});

// @Desc Update Contact
// @Route PUT /api/contacts/:id
// @Access Private
const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		res.status(400);
		throw new Error('Contact not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the contact user
	if (contact.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Unauthorized');
	}

	const updatedContact = await Contact.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json({ updatedContact });
});

// @Desc Delete Contact
// @Route DELETE /api/contacts/:id
// @Access Private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(400);
		throw new Error('Contact not found');
	}

	if (!req.user) {
		res.status(401);
		throw new Error('Unauthorized');
	}

	if (contact.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Unauthorized');
	}

	const deletedContact = await Contact.findByIdAndDelete(req.params.id);

	res.status(200).json(deleteContact._id);
});

module.exports = {
	getContacts,
	getUserContacts,
	createContact,
	updateContact,
	deleteContact,
};
