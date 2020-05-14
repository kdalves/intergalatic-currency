import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICurrency, IRomano } from './models/currency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'application';
  form: FormGroup;

  currency: ICurrency[];
  romanos: IRomano[];
  isValid: boolean;
  convertido: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      inputQuestion: [null, [Validators.required]],
    });
    this.currency = [];
    this.convertido = '';
    this.isValid = true;
    this.romanos = [
      {
        key: 'I',
        value: 1
      },
      {
        key: 'V',
        value: 5
      },
      {
        key: 'X',
        value: 10
      },
      {
        key: 'L',
        value: 50
      },
      {
        key: 'C',
        value: 100
      },
      {
        key: 'D',
        value: 500
      },
      {
        key: 'M',
        value: 1000
      }
    ];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) return;

    const valorInput = this.form.get('inputQuestion').value;
    const frase = valorInput.trim().split(' ');
    const index = this.buscaPosicaoPalavra(frase, 'vale');

    if(index !== -1 && frase[frase.length - 1] === '?') {
      // É uma pergunta
      this.isValid = true;
      this.calculateCredits(frase);
    } else if (index !== -1){
       // Inserir valor
       this.isValid = true;
      this.validaInsercaoMoeda(frase);
    } else {
      this.isValid = false;
    }
  }

  calculateCredits(phrase) {
    let valor = '';
    this.convertido = '';
    phrase.forEach((item) => {
      const moeda = this.currency.find((currency) => currency.key === item.toLowerCase());
      if(moeda) {
        valor += moeda.value
        this.convertido += `${moeda.key} `;
      }
    });

    const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (valor.match(regex)) {
      this.isValid = true;
      this.converterRomanosParaArabicos(valor);
    } else {
      this.isValid = false;
    }
  }

  converterRomanosParaArabicos(valor) {
    let creditos = 0;

    for(let i=0,j=1; j<=valor.length; i++, j++) {
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

    this.convertido += `vale ${creditos}`; 
  }

  descobreValorRomano(valorRomano) {
    const item = this.romanos.find((romano) => romano.key === valorRomano);
    return item.value;
  }

  validaInsercaoMoeda(frase) {
    const index = this.buscaPosicaoPalavra(frase, 'vale');
    const chave = frase[index - 1];
    const valor = frase[index + 1];
    if(chave?.length > 0 && valor?.length> 0) {
      this.isValid = true;
      this.inserirNovaMoeda(chave, valor);
    } else {
      this.isValid = false;
    }
  }

  inserirNovaMoeda(chave, valor) {
    const busca = this.buscarMoedaExistente(chave.toLowerCase());

    if(busca === -1) {
      this.currency.push({
        key: chave.toLowerCase(),
        value: valor.toUpperCase(),
      });
    } else {
      this.currency[busca].value = valor;
    }
  }

  buscarMoedaExistente(chave) {
    return this.currency.findIndex((item) => item.key === chave);
  }

  buscaPosicaoPalavra(phrase, word): number {
    return phrase.findIndex((palavra) => palavra === word);
  }
}