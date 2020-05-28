import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import getNumberRomans from './mocks/romans';
import { CalcularService } from './services/calcular.service';

describe('AppComponent', () => {
  let app;
  let calcularService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();

    calcularService = TestBed.get(CalcularService);
    calcularService.converterRomanosParaArabicos = jasmine.createSpy('instant').and.returnValue(68);
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
      expect(app.currency).toEqual([]);
      expect(app.frase).toEqual('');
      expect(app.exibir).toEqual(false);
      expect(app.invalido).toEqual(false);
    });
  });

  describe('calculaPerguntaValorConhecido()', () => {
    it('Calcula valor conhecido', () => {
      app.concataArrayEmFrase = jasmine.createSpy().and.returnValue('Dabu Swobu ');
      const frase = [
        'Quantos',
        'créditos',
        'tem',
        'Dabu',
        'Swobu',
      ];
      app.exibir = false;
      app.frase = '';

      app.calculaPerguntaValorConhecido(frase);

      expect(app.exibir).toEqual(true);
      expect(app.frase).toEqual('Dabu Swobu vale 68');
    });
  });

  describe('calcularCreditos()', () => {
    it('Calcula valor desconhecido', () => {
      app.concataArrayEmFrase = jasmine.createSpy().and.returnValue('Dabu Swobu prata ');
      const frase = [
        'Quantos',
        'créditos',
        'tem',
        'Dabu',
        'Swobu',
        'prata'
      ];
      app.exibir = false;
      app.frase = '';

      app.calcularCreditos(frase);

      expect(app.exibir).toEqual(true);
      expect(app.frase).toEqual('Dabu Swobu prata vale 68 créditos');
    });
  });

  describe('concataArrayEmFrase()', () => {
    it('Deve concatenar a frase', () => {
      const frase = [
        'Quantos',
        'créditos',
        'tem',
        'Dabu',
        'Swobu',
      ];

      const retorno = app.concataArrayEmFrase(frase);

      expect(retorno).toEqual('Quantos créditos tem Dabu Swobu ');
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

  describe('buscarMoedaExistente()', () => {
    it('must return position 1 of the currency', () => {
      app.currency = [
        {
          chave: 'dabu',
          valor: 'I'
        },
        {
          chave: 'test',
          valor: 'V'
        },
      ];
      const position = app.buscarMoedaExistente('test');

      expect(position).toEqual(1);
    });
  });
});
