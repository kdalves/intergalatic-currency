import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoedaService } from './services/moeda/moeda.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let app;
  let moedaService: MoedaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    moedaService = TestBed.get(MoedaService);
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'application'`, () => {
    expect(app.title).toEqual('application');
  });

  describe('Inicial value', () => {
    it('should initial values ​​must be set', () => {
      expect(app.moedas).toEqual([]);
      expect(app.frase).toEqual('');
      expect(app.exibir).toEqual(false);
      expect(app.invalido).toEqual(false);
    });
  });

  describe('isDescobrirValorDesconhecido()', () => {
    it('Deve retornar true se a pergunta tiver vale e creditos', () => {
      const frase = [
        'Dabu',
        'Dabu',
        'prata',
        'vale',
        '34',
        'créditos',
      ];

      const retorno = app.isDescobrirValorDesconhecido(frase);

      expect(retorno).toEqual(true);
    });
    it('Deve retornar false se a pergunta estiver invalida', () => {
      const frase = ['Ornitorrinco'];

      const retorno = app.isDescobrirValorDesconhecido(frase);

      expect(retorno).toEqual(false);
    });
  });

  describe('isDescobrirValorCreditos()', () => {
    it('Deve retornar true se a pergunta créditos e ponto de interrogação', () => {
      const frase = [
        'Quantos',
        'créditos',
        'tem',
        'Dabu',
        'Swobu',
        'prata',
        '?'
      ];

      const retorno = app.isDescobrirValorCreditos(frase);

      expect(retorno).toEqual(true);
    });
    it('Deve retornar false se a pergunta estiver invalida', () => {
      const frase = ['Ornitorrinco'];

      const retorno = app.isDescobrirValorCreditos(frase);

      expect(retorno).toEqual(false);
    });
  });

  describe('isPerguntaValor()', () => {
    it('Deve retornar true se a pergunta tiver vale e ponto de interrogação', () => {
      const frase = [
        'Quanto',
        'vale',
        'Loktar',
        'Mokra',
        'Dabu',
        'Dabu',
        '?'
      ];
      const retorno = app.isPerguntaValor(frase);

      expect(retorno).toEqual(true);
    });
    it('Deve retornar false se a pergunta estiver invalida', () => {
      const frase = ['Ornitorrinco'];

      const retorno = app.isPerguntaValor(frase);

      expect(retorno).toEqual(false);
    });
  });

  describe('isInserirValor()', () => {
    it('Deve retornar true se a tiver a palavra vale e um valor', () => {
      const frase = [
        'Dabu',
        'vale',
        'I',
      ];
      const retorno = app.isInserirValor(frase);

      expect(retorno).toEqual(true);
    });
    it('Deve retornar false se a pergunta estiver invalida', () => {
      const frase = ['Ornitorrinco'];

      const retorno = app.isInserirValor(frase);

      expect(retorno).toEqual(false);
    });
  });

  describe('buscaPosicaoPalavra()', () => {
    it('must return position 1 of the word test', () => {
      const phrase = [
        'Hello',
        'test',
        'one',
      ];
      const position = app.buscaPosicaoPalavra(phrase, 'test');

      expect(position).toEqual(1);
    });
  });

  describe('calculaPerguntaValorConhecido()', () => {
    it('deve chamar o calcularValorConhecido', () => {
      moedaService.calcularValorConhecido =
        jasmine.createSpy().and.returnValue(of({
          moedas: 'teste',
          valor: 'valor'
        }));

      app.calculaPerguntaValorConhecido('teste');

      expect(moedaService.calcularValorConhecido).toHaveBeenCalledWith('teste');
      expect(app.frase).toEqual('teste vale valor');
      expect(app.exibir).toEqual(true);
    });
    it('deve exibir o erro caso falhe a requisição', () => {
      moedaService.calcularValorConhecido =
        jasmine.createSpy().and.returnValue(throwError(new Error('Fake error')));

      app.calculaPerguntaValorConhecido('teste');

      expect(app.erro).toEqual(true);
    });
  });

  describe('calcularPergunta()', () => {
    it('deve chamar o calcularPergunta', () => {
      moedaService.calcularPergunta =
        jasmine.createSpy().and.returnValue(of({
          moedas: 'teste',
          valor: 'valor'
        }));

      app.calcularPergunta('teste');

      expect(moedaService.calcularPergunta).toHaveBeenCalledWith('teste');
      expect(app.frase).toEqual('teste vale valor créditos');
      expect(app.exibir).toEqual(true);
    });
    it('deve exibir o erro caso falhe a requisição', () => {
      moedaService.calcularPergunta =
        jasmine.createSpy().and.returnValue(throwError(new Error('Fake error')));

      app.calcularPergunta('teste');

      expect(app.erro).toEqual(true);
    });
  });

  describe('calcularCreditos()', () => {
    it('deve chamar o calcularCreditos', () => {
      moedaService.calcularCreditos =
        jasmine.createSpy().and.returnValue(of({}));

      app.calcularCreditos('teste');

      expect(moedaService.calcularCreditos).toHaveBeenCalledWith('teste');
      expect(app.frase).toEqual('Valor cadastrado');
      expect(app.exibir).toEqual(true);
    });
    it('deve exibir o erro caso falhe a requisição', () => {
      moedaService.calcularCreditos =
        jasmine.createSpy().and.returnValue(throwError(new Error('Fake error')));

      app.calcularCreditos('teste');

      expect(app.erro).toEqual(true);
    });
  });

  describe('listar()', () => {
    it('deve chamar o listar', () => {
      moedaService.listar =
        jasmine.createSpy().and.returnValue(of([
          'teste', 'teste'
        ]));

      app.listar();

      expect(moedaService.listar).toHaveBeenCalled();
      expect(app.moedas).toEqual([
        'teste', 'teste'
      ]);
    });
    it('deve exibir o erro caso falhe a requisição', () => {
      moedaService.listar =
        jasmine.createSpy().and.returnValue(throwError(new Error('Fake error')));

      app.listar();

      expect(app.erro).toEqual(true);
    });
  });

  describe('inserirNovaMoeda()', () => {
    it('deve chamar o inserirValor', () => {
      moedaService.inserirValor =
        jasmine.createSpy().and.returnValue(of({}));

      app.inserirNovaMoeda('teste');

      expect(moedaService.inserirValor).toHaveBeenCalledWith('teste');
      expect(app.frase).toEqual('Valor cadastrado');
      expect(app.exibir).toEqual(true);
    });
    it('deve exibir o erro caso falhe a requisição', () => {
      moedaService.inserirValor =
        jasmine.createSpy().and.returnValue(throwError(new Error('Fake error')));

      app.inserirNovaMoeda('teste');

      expect(app.erro).toEqual(true);
    });
  });
});
