const connection = require('../../database/connection');
const utils = require('../utils');
const romanoService = require('../services/RomanoService');
const calcularService = require('../services/CalcularService');
const creditoService = require('../services/CreditoService');

class MoedaController {

  async listarMoedas(req, res) {
    // listar as moedas
    const retorno = await connection('moedas').select('*');

    res.json(retorno);
  };

  async inserirMoeda(req, res) {
    const { frase } = req.body;
  
    const fraseArray = frase.toLowerCase().trim().split(' ');

    const index = utils.buscarPosicaoPalavra(fraseArray, 'vale');
    const nome = fraseArray[index - 1];
    const valor = fraseArray[index + 1];

    // buscar no banco para validar existencia
    const retorno = await connection('moedas')
      .select('*')
      .where('nome', nome);

    if (retorno.length === 0) {
      // inserir no banco
      await connection('moedas')
        .insert({
          nome,
          valor: valor.toUpperCase()
        });

    } else {
      // atualizar no banco

      await connection('moedas')
        .update({
          valor: valor.toUpperCase(),
        })
        .where({
          id: retorno[0].id
        });
    }

    const teste = await connection('moedas')
      .select('*');

    res.json(teste);
  };

  async calcularFraseValorConhecido(req, res) {
    const { frase } = req.body;
  
    const fraseArray = frase.toLowerCase().trim().split(' ');
    fraseArray.pop();

    const moedas = fraseArray.splice(utils.buscarPosicaoPalavra(fraseArray, 'vale') + 1);
    const valorRomano = await romanoService.converteFraseParaRomano(moedas);
    const romanoConvertido = calcularService.converterRomanosParaArabicos(valorRomano);

    const retorno = {
      moedas: utils.concataArrayEmFrase(moedas),
      valor: romanoConvertido,
    }

    res.json(retorno);
  };

  async calcularCreditos(req, res) {
    const { frase } = req.body;
  
    const fraseArray = frase.toLowerCase().trim().split(' ');

    const creditos = fraseArray[utils.buscarPosicaoPalavra(fraseArray, 'vale') + 1];
    const nome = fraseArray[utils.buscarPosicaoPalavra(fraseArray, 'vale') - 1];
    const valoresRomanos = fraseArray.splice(0, utils.buscarPosicaoPalavra(fraseArray, 'vale') - 1);

    const valorRomano = await romanoService.converteFraseParaRomano(valoresRomanos);
    const romanoConvertido = calcularService.converterRomanosParaArabicos(valorRomano);

    const valor = creditos/romanoConvertido;

    const retorno = await connection('creditos')
      .select('*')
      .where('nome', nome);

    if (retorno.length === 0) {
      // inserir no banco
      await connection('creditos')
        .insert({
          nome,
          valor: valor
        });

    } else {
      // atualizar no banco

      await connection('creditos')
        .update({
          valor: valor,
        })
        .where({
          id: retorno[0].id
        });
    }

    const teste = await connection('creditos')
      .select('*');

    res.json(teste);
  };

  async calcularPergunta(req, res) {
    const { frase } = req.body;
  
    const fraseArray = frase.toLowerCase().trim().split(' ');
    fraseArray.pop();

    const valores = fraseArray.splice(utils.buscarPosicaoPalavra(fraseArray, 'tem') + 1);

    const moedas = await romanoService.converteFraseParaRomano(valores);
    const romanoConvertido = calcularService.converterRomanosParaArabicos(moedas);
    const creditos = await creditoService.converteFraseParaCreditos(valores);
    const calculo = romanoConvertido * creditos;

    const retorno = {
      moedas: utils.concataArrayEmFrase(valores),
      valor: calculo,
    }

    res.json(retorno);
  }
}

module.exports = new MoedaController();