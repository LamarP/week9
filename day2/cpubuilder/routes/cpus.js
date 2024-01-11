const express = require('express');

const { getCpus, postCpu } = require('../controllers/cpus');

const router = express.Router();

const { requireSignin } = require('../controllers/userAuth');

router.get('/cpu', requireSignin, getCpus);
router.put('/cpu', requireSignin, postCpu);

module.exports = router;