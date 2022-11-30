const express = require('express');
const router = express.Router();
const {
	getContacts,
	getUserContacts,
	createContact,
	updateContact,
	deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/all', getContacts);

router.get('/', protect, getUserContacts);

router.post('/', protect, createContact);

router.put('/:id', protect, updateContact);

router.delete('/:id', protect, deleteContact);

module.exports = router;
