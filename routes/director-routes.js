var router       = require('express').Router();
var directorCtrl = require('../controllers/director-controller');

router
  .get("/directors", directorCtrl.index)
  .get("/directors/:id", directorCtrl.show)
  .post("/directors", directorCtrl.create)
  .put("/directors/:id", directorCtrl.update);

module.exports = router;
