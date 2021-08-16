const express = require('express');
const router = express.Router();
const hotelCtrl = require('../controllers/hotel.controller')

router.post('/create', hotelCtrl.create);
router.get('/read', hotelCtrl.read);
router.post('/filters', hotelCtrl.filters);
router.post('/create_many', hotelCtrl.create_many);
router.delete('/delete/:id', hotelCtrl.remove);
router.patch('/update/:id', hotelCtrl.update);

module.exports = router;