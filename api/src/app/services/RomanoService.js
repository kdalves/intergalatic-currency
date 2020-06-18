const utils = require('../utils');
const connection = require('../../database/connection');

class RomanoService {

  constructor() {
    this.romanos = utils.getNumerosRomanos();
  }

  async converteFraseParaRomano(frase) {
    let valor = '';

    const romanos = await connection('moedas').select('*');

    frase.forEach((item) => {
      const moeda = romanos.find((moeda) => moeda.nome === item);
      if (moeda) {
        valor += moeda.valor;
      }
    });
    
    if (this.isRomanoValido(valor)) {
      return valor;
    }
  }

  isRomanoValido(romano) {
    const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romano.match(regex);
  }
}

module.exports = new RomanoService();

