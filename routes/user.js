const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.loginUser); 
router.post('/register', userCtrl.registerUser);
router.get('/get-all-house',auth, userCtrl.getAllHouse);
router.post('/found',auth, userCtrl.insertHouse);
router.get('/delete-property/:id',auth, userCtrl.deleteProperty);
router.post('/update-property/:id',auth, userCtrl.updateProperty);

module.exports = router;