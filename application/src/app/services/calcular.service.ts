import { Injectable } from '@angular/core';
import { IRomano } from '../models/currency.model';
import getNumberRomans from '../mocks/romans';

@Injectable({
  providedIn: 'root'
})
export class CalcularService {

  romanos: IRomano[];

  constructor() {
    this.romanos = getNumberRomans();
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
