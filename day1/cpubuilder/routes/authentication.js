const express = require('express');

const { signUp, login, alreadyLoggedIn } = require('../controllers/userAuth');
const { requireSignin } = require('../controllers/userAuth');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/loggedin', requireSignin, alreadyLoggedIn);

module.exports = router;