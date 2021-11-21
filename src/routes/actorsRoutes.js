const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);
router.get('/actors/add', actorsController.add);
router.post('/actors/create', actorsController.store);
router.get('/actors/edit/:id', actorsController.edit);
router.put('/actors/update/:id', actorsController.update);
router.get('/actors/delete/:id', actorsController.destroy);
router.delete('/actors/delete/:id', actorsController.delete);

module.exports = router;