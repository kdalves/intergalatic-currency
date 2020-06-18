const utils = require('../utils');

class CalcularService {

  constructor() {
    this.romanos = utils.getNumerosRomanos();
  }

  converterRomanosParaArabicos(valor) {
    let creditos = 0;

    for (let i = 0, j = 1; j <= valor.length; i++, j++) {
      const valorI = this.descobreValorRomano(valor[i]);
      let valorJ = 0;
      if(valor[j]) {
        valorJ = this.descobreValorRomano(valor[j]);
      }
      if(valorI >= valorJ) {
        creditos += valorI;
      } else if (valorI < valorJ) {
        creditos += valorJ - valorI;
        i++;j++;
      }
    }

    return creditos;
  }

  descobreValorRomano(valorRomano) {
    const item = this.romanos.find((romano) => romano.key === valorRomano);
    return item.value;
  }
}

module.exports = new CalcularService();