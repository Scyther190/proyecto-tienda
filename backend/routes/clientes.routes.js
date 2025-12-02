const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

router.get('/', clientesController.obtenerTodos);
router.post('/', clientesController.crear);

module.exports = router;