const routes = require('express').Router();
const MoedaController = require('./app/controllers/MoedaController');
const fraseMiddleware = require('./app/middleware/frase');

// Listar as moedas
routes.get('/listar', MoedaController.listarMoedas);

routes.use(fraseMiddleware);

// Cadastrar valores - Dabu vale I
routes.post('/inserir', MoedaController.inserirMoeda);

// Calcula frase com valores conhecidos - Quanto vale Lok'tar Mok'ra Dabu Dabu ?
routes.post('/calcular/conhecido', MoedaController.calcularFraseValorConhecido)

// Calcula frase com créditos - Dabu Dabu prata vale 34 créditos 
routes.post('/calcular/creditos', MoedaController.calcularCreditos);

// Calcula frase completa - Quantos créditos tem Dabu Swobu prata ? 
routes.post('/calcular', MoedaController.calcularPergunta)

module.exports = routes;