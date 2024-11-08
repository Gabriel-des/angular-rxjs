import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultados } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API: string = 'https://www.googleapis.com/books/v1/volumes';
  constructor(
    private http: HttpClient
  ) { }

  public buscar(valorDigitado: string): Observable<LivrosResultados> {
    const params: HttpParams = new HttpParams().append('q', valorDigitado);

    return this.http.get<LivrosResultados>(this.API, { params });
  }
}
