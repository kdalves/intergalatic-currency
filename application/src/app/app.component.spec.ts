import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import getNumberRomans from './mocks/romans';

describe('AppComponent', () => {
  let app;
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
      expect(app.convertido).toEqual('');
      expect(app.isValid).toEqual(true);
      expect(app.romanos).toEqual(getNumberRomans());
    })
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
          key: 'dabu',
          value: 'I'
        },
        {
          key: 'test',
          value: 'V'
        },
      ];
      const position = app.buscarMoedaExistente('test');

      expect(position).toEqual(1);
    });
  });

  describe('inserirNovaMoeda()', () => {
    beforeEach(() => {
      app.currency = [
        {
          key: 'dabu',
          value: 'I'
        },
        {
          key: 'test',
          value: 'V'
        },
      ];
    });

    it('must insert new currency case she not exist', () => {
      app.inserirNovaMoeda('currency', 'L');

      expect(app.currency[2]).toEqual({
        key: 'currency',
        value: 'L'
      });
    });

    it('must update new currency case she exist', () => {
      app.inserirNovaMoeda('test', 'L');

      expect(app.currency[1]).toEqual({
        key: 'test',
        value: 'L'
      });
    });
  });

  describe('validaInsercaoMoeda()', () => {
    it('should not call the function if it does not contain a word before the vale and set isValid to false', () => {
      const phrase = [
        'vale',
        'I'
      ];
      app.isValid = true;
      app.inserirNovaMoeda = jasmine.createSpy();
      app.buscaPosicaoPalavra = jasmine.createSpy().and.returnValue(0);
      
      app.validaInsercaoMoeda(phrase);

      expect(app.inserirNovaMoeda).not.toHaveBeenCalled();
      expect(app.isValid).toEqual(false);
    });

    it('should not call the function if it does not contain a word after the vale and set isValid to false', () => {
      const phrase = [
        'dabu',
        'vale'
      ];
      app.isValid = true;
      app.inserirNovaMoeda = jasmine.createSpy();
      app.buscaPosicaoPalavra = jasmine.createSpy().and.returnValue(1);
      
      app.validaInsercaoMoeda(phrase);

      expect(app.inserirNovaMoeda).not.toHaveBeenCalled();
      expect(app.isValid).toEqual(false);
    });

     it('must call the function inserirNovaMoeda if phrase is ok', () => {
      const phrase = [
        'dabu',
        'vale',
        'I'
      ];
      app.isValid = false;
      app.inserirNovaMoeda = jasmine.createSpy();
      app.buscaPosicaoPalavra = jasmine.createSpy().and.returnValue(1);
      
      app.validaInsercaoMoeda(phrase);

      expect(app.inserirNovaMoeda).toHaveBeenCalledWith('dabu', 'I');
      expect(app.isValid).toEqual(true);
    });
  });

  describe('descobreValorRomano()', () => {
    it('must return value of number roman', () => {
      const roman = app.descobreValorRomano('I');

      expect(roman).toEqual(1);
    });
  });

  describe('converterRomanosParaArabicos()', () => {
    it('must convert number roman for arabic and set in convertido', () => {
      app.convertido = '';

      app.converterRomanosParaArabicos('VIII');

      expect(app.convertido).toEqual('vale 8');
    });
  });

  describe('calculateCredits()', () => {
    beforeEach(() => {
      app.currency = [
        {
          key: 'dabu',
          value: 'I'
        },
        {
          key: 'test',
          value: 'V'
        },
      ];
    })
    it('must convert to phrase for roman, if number roman is valid and set isValid for true', () => {
      const phrase = [
        'test',
        'dabu',
        'dabu',
      ];
      app.isValid = false;
      app.converterRomanosParaArabicos = jasmine.createSpy();

      app.calculateCredits(phrase);

      expect(app.converterRomanosParaArabicos).toHaveBeenCalled();
      expect(app.convertido).toEqual('test dabu dabu ');
      expect(app.isValid).toEqual(true);

    });

    it('must convert to phrase for roman, if number roman is invalid and set isValid for false', () => {
      const phrase = [
        'dabu',
        'test',
        'dabu',
      ];
      app.isValid = true;
      app.converterRomanosParaArabicos = jasmine.createSpy();

      app.calculateCredits(phrase);

      expect(app.convertido).toEqual('dabu test dabu ');
      expect(app.isValid).toEqual(false);
      expect(app.converterRomanosParaArabicos).not.toHaveBeenCalled();
    });
  });
});
