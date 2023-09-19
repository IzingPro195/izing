const express = require('express');
const autenticacaoController = require('../controllers/autenticacaoController');

const router = express.Router();

router.post('/autenticar', autenticacaoController.autenticar);

module.exports = router;