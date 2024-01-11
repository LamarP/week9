const express = require('express');

const { getCpus, postCpu } = require('../controllers/cpus');

const router = express.Router();

router.get('/cpu', getCpus);
router.put('/cpu', postCpu);

module.exports = router;