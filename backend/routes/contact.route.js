import express from 'express';
const router = express.Router();
const { submitContact } = require('../controllers/contact.controller.js');

router.post('/', submitContact);

module.exports = router;
