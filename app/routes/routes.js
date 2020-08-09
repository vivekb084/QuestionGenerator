const router = require('express').Router()
const calculations = require('../controllers/calculation');


router.get('/subtract', calculations.GenerateQuestion);

module.exports = router;
