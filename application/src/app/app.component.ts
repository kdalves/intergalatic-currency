import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICurrency, IRomano } from './models/currency.model';
import { CalcularService } from './services/calcular.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'application';
  form: FormGroup;

  currency: ICurrency[];


  exibir: boolean;
  frase: string;
  invalido: boolean;

  isValid: boolean;
  convertido: string;

  constructor(
    private formBuilder: FormBuilder,
    private calcularService: CalcularService,
  ) {
    this.form = formBuilder.group({
      inputQuestion: [null, [Validators.required]],
    });
    this.currency = [];
    this.frase = '';
    this.exibir = false;
    this.invalido = false;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.exibir = false;
    this.invalido = false;

    if (!this.form.valid) { return; }

    const valorInput = this.form.get('inputQuestion').value;
    const frase = valorInput.toLowerCase().trim().split(' ');

    if (this.isDescobrirValorCreditos(frase)) {

      this.calcularCreditos(frase);

    } else if (this.isDescobrirValorDesconhecido(frase)) {

      this.calcularValorDesconhecido(frase);

    } else if (this.isPerguntaValor(frase)){

      this.calculaPerguntaValorConhecido(frase);

    } else if (this.isInserirValor(frase)) {

      const index = this.buscaPosicaoPalavra(frase, 'vale');
      const chave = frase[index - 1];
      const valor = frase[index + 1];

      this.inserirNovaMoeda(chave, valor, true);
    } else {
      this.setarFraseInvalida();
    }
  }

  // Quantos créditos tem Dabu Swobu prata?
  calculaPerguntaValorConhecido(frase) {
    frase.pop();
    const valores = frase.splice(this.buscaPosicaoPalavra(frase, 'vale') + 1);
    const romanos = this.converteFraseParaRomano(valores);
    const romanoConvertido = this.calcularService.converterRomanosParaArabicos(romanos);
    this.frase = `${this.concataArrayEmFrase(valores)}vale ${romanoConvertido}`;
    this.exibir = true;
  }

  calcularCreditos(frase: []) {
    // Quantos créditos tem Dabu Swobu prata?
    frase.pop();
    const valores = frase.splice(this.buscaPosicaoPalavra(frase, 'tem') + 1);
    const romanos = this.converteFraseParaRomano(valores);
    const romanoConvertido = this.calcularService.converterRomanosParaArabicos(romanos);
    const creditos = this.converteFraseParaNaoRomano(valores);
    const calculo = romanoConvertido * creditos;

    this.frase = `${this.concataArrayEmFrase(valores)}vale ${calculo} créditos`;
    this.exibir = true;
  }

  concataArrayEmFrase(frase) {
    let resposta = '';
    frase.forEach(palavra => {
      resposta += palavra + ' ';
    });

    return resposta;
  }

  calcularValorDesconhecido(frase: []) {
    const numerico = frase[this.buscaPosicaoPalavra(frase, 'vale') + 1];
    const desconhecido = frase[this.buscaPosicaoPalavra(frase, 'vale') - 1];

    const valoresRomanos = frase.splice(0, this.buscaPosicaoPalavra(frase, 'vale') - 1);
    const romanos = this.converteFraseParaRomano(valoresRomanos);
    const romanoConvertido = this.calcularService.converterRomanosParaArabicos(romanos);

    this.inserirNovaMoeda(desconhecido, numerico / romanoConvertido, false);
  }

  isDescobrirValorDesconhecido(frase: []) {
    const vale = this.buscaPosicaoPalavra(frase, 'vale');
    const creditos = this.buscaPosicaoPalavra(frase, 'créditos');

    return vale !== -1 && creditos === frase.length - 1;
  }

  isDescobrirValorCreditos(frase: []) {
    const credito = this.buscaPosicaoPalavra(frase, 'créditos');
    const interrogacao = frase[frase.length - 1] === '?';

    return credito !== -1 && interrogacao;
  }

  isPerguntaValor(frase) {
    const index = this.buscaPosicaoPalavra(frase, 'vale');
    return index !== -1 && frase[frase.length - 1] === '?';
  }

  isInserirValor(frase) {
    const index = this.buscaPosicaoPalavra(frase, 'vale');
    const chave = frase[index - 1];
    const valor = frase[index + 1];
    return chave?.length > 0 && valor?.length > 0;
  }

  converteFraseParaNaoRomano(frase) {
    let valor = 1;
    frase.forEach((item) => {
      const moeda = this.currency.find((currency) => currency.chave === item && !currency.isRomano);
      if (moeda) {
        valor = valor * moeda.valor;
      }
    });
    return valor;
  }

  converteFraseParaRomano(frase) {
    let valor = '';
    frase.forEach((item) => {
      const moeda = this.currency.find((currency) => currency.chave === item && currency.isRomano);
      if (moeda) {
        valor += moeda.valor;
      }
    });

    const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (valor.match(regex)) {
      return valor;
    }
  }

  inserirNovaMoeda(chave, valor, isRomano) {
    const busca = this.buscarMoedaExistente(chave.toLowerCase());

    if (busca === -1) {
      this.currency.push({
        chave: chave.toLowerCase(),
        valor: isRomano ? valor.toUpperCase() : valor,
        isRomano,
      });
    } else {
      this.currency[busca].valor = isRomano ? valor.toUpperCase() : valor;
    }

    this.form.get('inputQuestion').setValue('');

    this.frase = 'Valor cadastrado';
    this.exibir = true;
  }

  buscarMoedaExistente(chave) {
    return this.currency.findIndex((item) => item.chave === chave);
  }

  buscaPosicaoPalavra(phrase, word): number {
    return phrase.findIndex((palavra) => palavra === word);
  }

  setarFraseInvalida() {
    this.exibir = false;
    this.invalido = true;
  }
}
