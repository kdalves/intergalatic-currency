import { MoedaService } from './services/moeda/moeda.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'application';
  form: FormGroup;

  exibir: boolean;
  frase: string;
  invalido: boolean;
  erro: boolean;
  moedas: any[];

  constructor(
    private formBuilder: FormBuilder,
    private moedaService: MoedaService,
  ) {
    this.form = formBuilder.group({
      inputQuestion: [null, [Validators.required]],
    });
    this.frase = '';
    this.moedas = [];
    this.exibir = false;
    this.invalido = false;
    this.erro = false;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.exibir = false;
    this.invalido = false;
    this.erro = false;

    if (!this.form.valid) { return; }

    const valorInput = this.form.get('inputQuestion').value;
    const frase = valorInput.toLowerCase().trim().split(' ');

    if (this.isDescobrirValorCreditos(frase)) {

      this.calcularPergunta(valorInput);

    } else if (this.isDescobrirValorDesconhecido(frase)) {

      this.calcularCreditos(valorInput);

    } else if (this.isPerguntaValor(frase)){

      this.calculaPerguntaValorConhecido(valorInput);

    } else if (this.isInserirValor(frase)) {

      this.inserirNovaMoeda(valorInput);

    } else {
      this.setarFraseInvalida();
    }
  }

  // Quanto vale Lok'tar Mok'ra Dabu Dabu ?
  calculaPerguntaValorConhecido(frase) {
    this.moedaService.calcularValorConhecido(frase)
      .subscribe((resposta) => {
        this.frase = `${resposta.moedas} vale ${resposta.valor}`;
        this.exibir = true;
      },
      () => {
        this.erro = true;
      });
  }

  // Quantos créditos tem Dabu Swobu prata?
  calcularPergunta(frase) {
    this.moedaService.calcularPergunta(frase)
      .subscribe((resposta) => {
        this.frase = `${resposta.moedas} vale ${resposta.valor} créditos`;
        this.exibir = true;
      },
      () => {
        this.erro = true;
      });
  }

  // Dabu Dabu prata vale 34 créditos
  calcularCreditos(frase) {
    this.moedaService.calcularCreditos(frase)
      .subscribe(() => {
        this.frase = 'Valor cadastrado';
        this.exibir = true;
      },
      () => {
        this.erro = true;
      });
  }

  listar() {
    this.moedaService.listar()
      .subscribe(resposta => {
        this.moedas = resposta;
      },
      () => {
        this.erro = true;
      });
  }

  // Dabu vale I
  inserirNovaMoeda(valorInput) {
    this.moedaService.inserirValor(valorInput)
      .subscribe(() => {
        this.form.get('inputQuestion').setValue('');
        this.frase = 'Valor cadastrado';
        this.exibir = true;
      },
      () => {
        this.erro = true;
      });
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

  buscaPosicaoPalavra(frase, palavraBusca): number {
    return frase.findIndex((palavra) => palavra === palavraBusca);
  }

  setarFraseInvalida() {
    this.exibir = false;
    this.invalido = true;
  }
}
