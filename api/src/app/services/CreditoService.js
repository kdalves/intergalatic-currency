
const connection = require('../../database/connection');
 
class CreditoService { 
  async converteFraseParaCreditos(frase) {
    let valor = 1;

    const creditos = await connection('creditos').select('*');

    frase.forEach((item) => {
      const credito = creditos.find((credito) => credito.nome === item);
      if (credito) {
        valor = valor * credito.valor;
      }
    });

    return valor;
  } 
}

module.exports = new CreditoService();