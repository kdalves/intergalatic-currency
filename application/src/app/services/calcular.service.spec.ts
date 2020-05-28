import { TestBed } from '@angular/core/testing';

import { CalcularService } from './calcular.service';

describe('CalcularService', () => {
  let service: CalcularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('converterRomanosParaArabicos()', () => {
    it('Deve calcular numeros romanos para arabicos', () => {
      const valor = 'III';

      const retorno = service.converterRomanosParaArabicos(valor);

      expect(retorno).toEqual(3);
    });
  });

  describe('descobreValorRomano()', () => {
    it('Deve retornar valor do uma chave romana', () => {
      const valor = 'I';

      const retorno = service.descobreValorRomano(valor);

      expect(retorno).toEqual(1);
    });
  });
});
