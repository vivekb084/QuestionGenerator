const router = require('express').Router()
const calculations = require('../controllers/calculation');


router.post('/subtract', calculations.GenerateQuestion);

module.exports = router;
