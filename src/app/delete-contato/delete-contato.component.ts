import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { Contato } from '../service/contato.model';
import { ContatoService } from '../service/contato.service';


@Component({
  selector: 'app-delete-contato',
  templateUrl: './delete-contato.component.html',
  styleUrls: ['./delete-contato.component.css']
})
export class DeleteContatoComponent implements OnInit {

  contato!: Contato;

  constructor(
    private _contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.contato = new Contato();

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get("id") || "";
        return this._contatoService.buscarPorId(id)
    })
    )
    .subscribe(
      (c)=>{
        this.contato = c;
      },
      (error) => alert('Ocorreu um erro no servidor, tente novamente.')
    )
  }

  deletarContato() {
    const id = this.contato.id;
    this._contatoService.deletar(id).subscribe(
      () => this.router.navigateByUrl("contatos"),
      () => alert("Erro ao tentar excluir")
    )
  }

}



