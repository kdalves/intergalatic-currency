import { TestBed } from '@angular/core/testing';

import { MoedaService } from './moeda.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MoedaService', () => {
  let service: MoedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MoedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('inserirValor()', () => {
    it('deve chamar o endpoint', () => {
      const httpClient: HttpClient = TestBed.get(HttpClient);
      httpClient.post = jasmine.createSpy().and.returnValue(of({}));

      service.inserirValor('teste');

      expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/inserir', { frase: 'teste' })
    });
  });

  describe('calcularValorConhecido()', () => {
    it('deve chamar o endpoint', () => {
      const httpClient: HttpClient = TestBed.get(HttpClient);
      httpClient.post = jasmine.createSpy().and.returnValue(of({}));

      service.calcularValorConhecido('teste');

      expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/calcular/conhecido', { frase: 'teste' })
    });
  });

  describe('calcularPergunta()', () => {
    it('deve chamar o endpoint', () => {
      const httpClient: HttpClient = TestBed.get(HttpClient);
      httpClient.post = jasmine.createSpy().and.returnValue(of({}));

      service.calcularPergunta('teste');

      expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/calcular', { frase: 'teste' })
    });
  });

  describe('calcularCreditos()', () => {
    it('deve chamar o endpoint', () => {
      const httpClient: HttpClient = TestBed.get(HttpClient);
      httpClient.post = jasmine.createSpy().and.returnValue(of({}));

      service.calcularCreditos('teste');

      expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/calcular/creditos', { frase: 'teste' })
    });
  });

  describe('listar()', () => {
    it('deve chamar o endpoint', () => {
      const httpClient: HttpClient = TestBed.get(HttpClient);
      httpClient.get = jasmine.createSpy().and.returnValue(of({}));

      service.listar();

      expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/listar')
    });
  });
});
