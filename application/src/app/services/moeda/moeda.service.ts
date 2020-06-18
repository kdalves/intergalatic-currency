import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  constructor(private httpClient: HttpClient) { }

  inserirValor(frase): Observable<any>  {
    return this.httpClient.post('http://localhost:3000/inserir', { frase });
  }

  calcularValorConhecido(frase): Observable<any> {
    return this.httpClient.post('http://localhost:3000/calcular/conhecido', { frase });
  }

  calcularPergunta(frase): Observable<any> {
    return this.httpClient.post('http://localhost:3000/calcular', { frase });
  }

  calcularCreditos(frase): Observable<any> {
    return this.httpClient.post('http://localhost:3000/calcular/creditos', { frase });
  }

  listar(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/listar');
  }
}
