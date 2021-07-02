import { Component, OnInit } from '@angular/core';
import { Contato } from '../service/contato.model';
import { ContatoService } from '../service/contato.service';




@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

  contatos: Contato[] = [];

  constructor(
    private _contatoService: ContatoService,
    ) { }

  ngOnInit(): void {
    this._contatoService.retornarTodos().subscribe(
      (c: any) => this.contatos = c,
      (error: any) => alert('Erro ao carregar a lista')
    )
  }

  get filtrarContatos() {
    return this.contatos.filter( x => x.id > 0);
  }
}



