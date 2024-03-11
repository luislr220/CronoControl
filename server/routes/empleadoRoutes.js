var express = require('express');
var router = express.Router();
const Empleado = require("../models/empleadoSchema");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
