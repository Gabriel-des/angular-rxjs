import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, map, filter, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { Item, LivrosResultados } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/services/livro.service';

const PAUSA: number = 500;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultados;

  constructor(
    private livroService: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado: string) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado: string) => this.livroService.buscar(valorDigitado)),
    map(resultado =>  this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = 'error'
      return EMPTY;
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    });
  }

}



