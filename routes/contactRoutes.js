const express = require('express');
const router = express.Router();
const { contact } = require('../controllers/contactController')



router.post('/contactus', contact);



module.exports = router;