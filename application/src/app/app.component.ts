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
}